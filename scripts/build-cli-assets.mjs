import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import postcss from "postcss";

// This also runs as the root package's `prepack` hook.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "cli", "generated");
if (relative(root, out).replaceAll("\\", "/") !== "cli/generated") {
  throw new Error("CLI asset output must stay at cli/generated.");
}
rmSync(out, { recursive: true, force: true });
mkdirSync(resolve(out, "components"), { recursive: true });

const componentSource = resolve(root, "src", "components");
for (const file of readdirSync(componentSource)) {
  if (!/\.(tsx|ts|jsx)$/.test(file) || /\.(test|stories)\./.test(file)) continue;
  cpSync(resolve(componentSource, file), resolve(out, "components", file));
}
cpSync(resolve(root, "src", "styles", "tokens.css"), resolve(out, "tokens.css"));
cpSync(resolve(root, "docs", "inkwell.ai.md"), resolve(out, "inkwell.ai.md"));

const inkwellCss = readFileSync(resolve(root, "src", "styles", "inkwell.css"), "utf8");
writeFileSync(resolve(root, "cli", "styles", "all-components.css"), `/* Canonical Inkwell component stylesheet; generated from src/styles/inkwell.css. */\n${inkwellCss}`, "utf8");

// base.css is the inkwell.base layer verbatim. It used to be maintained by
// hand, which meant the fragment install mode could silently drift from the
// canonical stylesheet — and it had, by the time anyone checked.
const baseLayer = postcss.parse(inkwellCss).nodes.find(
  (node) => node.type === "atrule" && node.name === "layer" && node.params === "inkwell.base" && node.nodes,
);
if (!baseLayer) throw new Error("Expected the canonical inkwell.base CSS layer.");
writeFileSync(resolve(root, "cli", "styles", "base.css"), `/* Generated from the inkwell.base layer in src/styles/inkwell.css. */
${baseLayer.toString()}
`, "utf8");
const fragments = spawnSync(process.execPath, [resolve(root, "scripts", "generate-cli-css-fragments.mjs")], { cwd: root, stdio: "inherit" });
if (fragments.status !== 0) throw new Error("Could not generate CLI CSS fragments.");
console.log("Generated CLI source assets.");
