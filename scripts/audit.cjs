#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const level = process.argv[2] || "critical";
const minSeverity = level === "critical" ? "critical" : "high";
const ignoreUnfixable = level === "high";

const pkg = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf-8"));

const deps = {};
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
Object.entries(allDeps || {}).forEach(([name, version]) => {
  const clean = version.replace(/^[~^>=<]+/, "");
  deps[name] = [clean];
});

console.log(
  "Checking",
  Object.keys(deps).length,
  "packages with npm audit API...",
);

fetch("https://registry.npmjs.org/-/npm/v1/security/advisories/bulk", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(deps),
})
  .then((r) => r.json())
  .then((data) => {
    const vulns = Object.entries(data).filter(([, v]) => v.length);
    if (vulns.length === 0) {
      console.log("✔ No vulnerabilities found");
      process.exit(0);
    }

    const filtered = vulns.filter(([, v]) =>
      v.some((i) => i.severity === "critical" || i.severity === "high"),
    );

    if (filtered.length === 0) {
      console.log("✔ No high+ vulnerabilities found");
      process.exit(0);
    }

    console.log("✖ Found vulnerabilities:");
    filtered.forEach(([name, issues]) => {
      issues.forEach((i) => {
        if (i.severity === "critical" || i.severity === "high") {
          console.log(
            "  " +
              name +
              "@" +
              i.vulnerable_versions +
              " (" +
              i.severity +
              ") " +
              i.title,
          );
        }
      });
    });

    const hasCritical = filtered.some(([, v]) =>
      v.some((i) => i.severity === "critical"),
    );
    process.exit(hasCritical ? 1 : 0);
  })
  .catch((err) => {
    console.error("Audit failed:", err.message);
    process.exit(1);
  });
