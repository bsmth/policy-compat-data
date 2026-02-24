import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("policies.json matches schema", () => {
  const res = spawnSync("node", ["scripts/validate-schema.mjs"], {
    encoding: "utf8",
  });

  assert.equal(
    res.status,
    0,
    `Validation failed.\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
  );
});
