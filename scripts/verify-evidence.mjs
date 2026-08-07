import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const demoPath = resolve(root, "prototypes/prism-breakers.html");
const source = readFileSync(demoPath, "utf8");

const requiredMarkers = [
  "PRISM BREAKERS",
  "파티 편성",
  "drag",
  "gaon",
  "biyeon",
  "lumi",
  "WEAK POINT!",
];

const missingMarkers = requiredMarkers.filter((marker) => !source.includes(marker));
if (missingMarkers.length > 0) {
  throw new Error(`핵심 기능 표식을 찾지 못했습니다: ${missingMarkers.join(", ")}`);
}

try {
  execFileSync("git", ["diff", "--check"], { cwd: root, stdio: "pipe" });
} catch (error) {
  throw new Error(`공백 또는 충돌 표식 검사 실패:\n${error.stdout?.toString() ?? ""}`);
}

const sha256 = createHash("sha256").update(source).digest("hex");
const report = {
  schemaVersion: 1,
  verifiedAtUtc: new Date().toISOString(),
  commitSha: process.env.GITHUB_SHA ?? "local-uncommitted-check",
  workflowRunId: process.env.GITHUB_RUN_ID ?? "local",
  demo: "prototypes/prism-breakers.html",
  demoSha256: sha256,
  requiredMarkers,
  result: "passed",
};

mkdirSync(resolve(root, "artifacts"), { recursive: true });
writeFileSync(resolve(root, "artifacts", "verification.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
