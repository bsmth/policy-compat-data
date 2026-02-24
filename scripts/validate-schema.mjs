import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const compatFile = path.join(root, "data", "policy-compat-data.json");
const schemaFile = path.join(root, "data", "policy-compat-data.schema.json");

const policies = JSON.parse(fs.readFileSync(compatFile, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaFile, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validate = ajv.compile(schema);
const ok = validate(policies);

if (!ok) {
  console.error("Validation failed:");
  for (const err of validate.errors ?? []) {
    console.error(`- ${err.instancePath || "/"} ${err.message}`);
  }
  process.exit(1);
}

console.log("policy-compat-data.json matches schema");
