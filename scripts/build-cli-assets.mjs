import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// This also runs as the CLI package's `prepare` hook, where cwd is `cli/`.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "cli", "generated");
rmSync(out, { recursive: true, force: true });
mkdirSync(resolve(out, "components"), { recursive: true });

const componentSource = resolve(root, "src", "components");
for (const file of readdirSync(componentSource)) {
  if (!/\.(tsx|ts|jsx)$/.test(file) || /\.(test|stories)\./.test(file)) continue;
  cpSync(resolve(componentSource, file), resolve(out, "components", file));
}
cpSync(resolve(root, "src", "styles", "tokens.css"), resolve(out, "tokens.css"));

const inkwellCss = readFileSync(resolve(root, "src", "styles", "inkwell.css"), "utf8");
writeFileSync(resolve(root, "cli", "styles", "all-components.css"), `/* Canonical Inkwell component stylesheet; generated from src/styles/inkwell.css. */\n${inkwellCss}`, "utf8");
console.log("Generated CLI source assets.");
