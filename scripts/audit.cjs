#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

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
    console.log("✖ Found", vulns.length, "vulnerabilities:");
    vulns.forEach(([name, issues]) => {
      issues.forEach((i) =>
        console.log(
          "  " +
            name +
            "@" +
            i.vulnerable_versions +
            " (" +
            i.severity +
            ") " +
            i.title,
        ),
      );
    });
    const hasCritical = vulns.some(([, v]) =>
      v.some((i) => i.severity === "critical" || i.severity === "high"),
    );
    process.exit(hasCritical ? 1 : 0);
  })
  .catch((err) => {
    console.error("Audit failed:", err.message);
    process.exit(1);
  });
