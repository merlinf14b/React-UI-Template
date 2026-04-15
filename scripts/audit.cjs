#!/usr/bin/env node
// Audit all packages in pnpm-lock.yaml using the npm bulk advisory API.
// Usage:
//   node scripts/audit.cjs critical  — exit 1 on any critical vulnerability
//   node scripts/audit.cjs high      — exit 1 on fixable high+ vulnerabilities
const fs = require("fs");
const path = require("path");

const level = process.argv[2] || "critical";
const failOnHighFixable = level === "high";

// Parse pnpm-lock.yaml to collect ALL installed packages (not just direct deps).
// The packages section contains entries like:
//   'name@version':
//   '@scope/name@version':
const lockfilePath = path.resolve("pnpm-lock.yaml");
const lockfile = fs.readFileSync(lockfilePath, "utf-8");

const packagesIdx = lockfile.indexOf("\npackages:\n");
if (packagesIdx === -1) {
  console.log("No packages section found in lockfile — nothing to audit.");
  process.exit(0);
}

const packagesSection = lockfile.slice(packagesIdx);
const pkgMap = {};
const entryPattern = /^  '?(@?[^@'\s]+)@([^':\s]+)'?:/gm;
let m;
while ((m = entryPattern.exec(packagesSection)) !== null) {
  const name = m[1];
  const version = m[2];
  if (!pkgMap[name]) pkgMap[name] = [];
  if (!pkgMap[name].includes(version)) pkgMap[name].push(version);
}

const totalPackages = Object.keys(pkgMap).length;
console.log(
  `Checking ${totalPackages} packages (from lockfile) with npm audit API...`,
);

// Batch requests to keep payloads reasonable.
const BATCH_SIZE = 100;
const entries = Object.entries(pkgMap);
const batches = [];
for (let i = 0; i < entries.length; i += BATCH_SIZE) {
  batches.push(Object.fromEntries(entries.slice(i, i + BATCH_SIZE)));
}

// A vulnerability is "fixable" when patched_versions is a real range
// (not empty and not the sentinel "<0.0.0-0" that npm uses for unfixable).
function isFixable(advisory) {
  const pv = advisory.patched_versions;
  return pv && pv !== "" && pv !== "<0.0.0-0";
}

Promise.all(
  batches.map((batch) =>
    fetch("https://registry.npmjs.org/-/npm/v1/security/advisories/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(batch),
    }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status} from npm audit API`);
      return r.json();
    }),
  ),
)
  .then((results) => {
    // Merge all batch results.
    const merged = {};
    for (const result of results) {
      for (const [name, advisories] of Object.entries(result)) {
        if (!merged[name]) merged[name] = [];
        merged[name].push(...advisories);
      }
    }

    const vulns = Object.entries(merged).filter(([, v]) => v.length > 0);
    if (vulns.length === 0) {
      console.log("✔ No vulnerabilities found");
      process.exit(0);
    }

    let hasCritical = false;
    let hasFixableHigh = false;

    console.log("Found vulnerabilities:");
    for (const [name, advisories] of vulns) {
      for (const advisory of advisories) {
        const { severity, title, vulnerable_versions, patched_versions } =
          advisory;
        if (severity !== "critical" && severity !== "high") continue;

        const fixable = isFixable(advisory);
        const fixNote = fixable
          ? `fix: ${patched_versions}`
          : "no fix available";
        console.log(
          `  ${name}@${vulnerable_versions} (${severity}) ${title} [${fixNote}]`,
        );

        if (severity === "critical") hasCritical = true;
        if (severity === "high" && fixable) hasFixableHigh = true;
      }
    }

    if (hasCritical) {
      console.error("\n✖ Critical vulnerabilities found — failing.");
      process.exit(1);
    }

    if (failOnHighFixable && hasFixableHigh) {
      console.error(
        "\n✖ Fixable high-severity vulnerabilities found — failing.",
      );
      process.exit(1);
    }

    console.log("\n✔ No actionable vulnerabilities found.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Audit failed:", err.message);
    process.exit(1);
  });
