import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(process.cwd());
const sourcePath = resolve(root, "tokens", "inkwell.tokens.json");
const outputPath = resolve(root, "src", "styles", "tokens.css");
const tokenGroups = JSON.parse(readFileSync(sourcePath, "utf8"));

function toCssVariables(groupName, groupValues) {
  return Object.entries(groupValues)
    .map(([key, value]) => `  --${groupName}-${key}: ${value};`)
    .join("\n");
}

const css = [
  ":root {",
  ...Object.entries(tokenGroups).map(([groupName, groupValues]) => toCssVariables(groupName, groupValues)),
  "}",
  "",
].join("\n");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, css, "utf8");
console.log(`Generated ${outputPath}`);
