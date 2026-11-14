import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.cwd());
function removeFixture(target) {
  const inside = relative(root, target).replaceAll("\\", "/");
  if (!inside.startsWith(".tmp-inkwell-cli-")) throw new Error(`Unsafe fixture path: ${target}`);
  rmSync(target, { recursive: true, force: true });
}
const fixture = resolve(root, ".tmp-inkwell-cli-fixture");
removeFixture(fixture);
mkdirSync(resolve(fixture, "src"), { recursive: true });
writeFileSync(resolve(fixture, "package.json"), JSON.stringify({ name: "inkwell-cli-fixture", private: true, type: "module", scripts: { build: "vite build" }, dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" }, devDependencies: { vite: "^8.0.0", "@vitejs/plugin-react": "^6.0.0" } }, null, 2));
writeFileSync(resolve(fixture, "index.html"), '<div id="root"></div><script type="module" src="/src/main.jsx"></script>');
const cli = resolve(root, "cli/bin/inkwell.js");
const packageManifest = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
if (packageManifest.bin?.inkwell !== "cli/bin/inkwell.js") throw new Error("Root package must expose the inkwell CLI binary.");
const { registry } = await import(pathToFileURL(resolve(root, "cli/registry.mjs")).href);
function resolveLocalImport(fromFile, specifier) {
  const target = resolve(dirname(fromFile), specifier);
  const candidates = [target, `${target}.tsx`, `${target}.ts`, `${target}.jsx`, `${target}.js`];
  return candidates.find((candidate) => existsSync(candidate));
}
function assertLocalImportClosure(directory, command) {
  const files = readdirSync(directory).filter((file) => /\.(tsx|ts|jsx|js)$/.test(file));
  for (const file of files) {
    const path = resolve(directory, file);
    const source = readFileSync(path, "utf8");
    const imports = source.matchAll(/(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\sfrom\s+)?["'](\.[^"']+)["']/g);
    for (const match of imports) {
      const specifier = match[1];
      const dependency = resolveLocalImport(path, specifier);
      if (!dependency || relative(directory, dependency).startsWith("..")) {
        throw new Error(`CLI ${command} fixture has an incomplete local import closure: ${file} -> ${specifier}`);
      }
    }
  }
}
let initOutput = "";
for (const args of [["init"], ["add", ...Object.keys(registry)]]) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: fixture, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`CLI ${args.join(" ")} failed:\n${result.stderr}`);
  if (args[0] === "init") initOutput = result.stdout;
}
for (const file of ["avatar.tsx", "badge.tsx", "button.tsx", "spinner.tsx", "card.tsx", "divider.tsx", "layout.tsx", "forms.tsx", "icons.jsx", "pill.tsx", "surface.tsx", "text.tsx", "inkwell.css"]) if (!existsSync(resolve(fixture, "src/components/inkwell", file))) throw new Error(`Expected installed file: ${file}`);
if (!existsSync(resolve(fixture, "inkwell.ai.md"))) throw new Error("Expected generated LLM guidance file.");
const generatedGuidance = readFileSync(resolve(fixture, "inkwell.ai.md"), "utf8");
if (!generatedGuidance.includes("Inkwell guidance for coding agents")) throw new Error("Generated LLM guidance file has unexpected contents.");
if (!generatedGuidance.includes("Source Sans 3") || !generatedGuidance.includes("League Spartan")) throw new Error("Generated LLM guidance must include required font setup.");
if (!initOutput.includes("Required fonts: load Source Sans 3 and League Spartan")) throw new Error("CLI init must call out required font setup.");
if (packageManifest.exports?.["./ai.md"] !== "./cli/generated/inkwell.ai.md") throw new Error("Root package must export its LLM guidance file.");
const installedModules = readdirSync(resolve(fixture, "src/components/inkwell")).filter((file) => /\.(tsx|ts|jsx)$/.test(file)).map((file) => `import "./components/inkwell/${file}";`).join("\n");
writeFileSync(resolve(fixture, "src/main.jsx"), `${installedModules}\nimport { createRoot } from "react-dom/client"; import { Button } from "./components/inkwell/button"; import "./components/inkwell/inkwell.css"; createRoot(document.getElementById("root")).render(<main className="inkwell-page"><Button>Save</Button></main>);`);
const duplicate = spawnSync(process.execPath, [cli, "add", "card"], { cwd: fixture, encoding: "utf8" });
if (duplicate.status === 0 || !duplicate.stderr.includes("Refusing to overwrite")) throw new Error("CLI did not refuse to overwrite an installed component.");
const version = spawnSync(process.execPath, [cli, "version"], { cwd: fixture, encoding: "utf8" });
if (version.status !== 0 || !version.stdout.includes(`button: added with ${packageManifest.version}`)) throw new Error(`CLI version did not report source provenance:\n${version.stderr}\n${version.stdout}`);
const initialDiff = spawnSync(process.execPath, [cli, "diff", "card"], { cwd: fixture, encoding: "utf8" });
if (initialDiff.status !== 0 || !initialDiff.stdout.includes(`match Inkwell ${packageManifest.version}`)) throw new Error(`Fresh CLI install should match its package:\n${initialDiff.stderr}\n${initialDiff.stdout}`);
const build = spawnSync(process.execPath, [resolve(root, "node_modules/vite/bin/vite.js"), "build"], { cwd: fixture, encoding: "utf8" });
if (build.status !== 0) throw new Error(`Fixture build failed:\n${build.stderr}\n${build.stdout}`);
const ownedCard = resolve(fixture, "src/components/inkwell/card.tsx");
writeFileSync(ownedCard, `${readFileSync(ownedCard, "utf8")}\n// Consumer customization\n`);
const ownedStylesheet = resolve(fixture, "src/components/inkwell/inkwell.css");
writeFileSync(ownedStylesheet, `${readFileSync(ownedStylesheet, "utf8")}\n/* Consumer customization */\n`);
const changedVersion = spawnSync(process.execPath, [cli, "version"], { cwd: fixture, encoding: "utf8" });
if (changedVersion.status !== 0 || !changedVersion.stdout.includes("Locally changed source files: card.tsx") || !changedVersion.stdout.includes("Locally changed stylesheet")) throw new Error("CLI version did not detect consumer edits.");
const changedDiff = spawnSync(process.execPath, [cli, "diff", "card"], { cwd: fixture, encoding: "utf8" });
if (changedDiff.status !== 0 || !changedDiff.stdout.includes("-// Consumer customization") || !changedDiff.stdout.includes("-/* Consumer customization */")) throw new Error(`CLI diff did not show the consumer edits:\n${changedDiff.stderr}\n${changedDiff.stdout}`);
if (!readFileSync(ownedCard, "utf8").includes("Consumer customization")) throw new Error("CLI diff modified a user-owned file.");
if (!readFileSync(ownedStylesheet, "utf8").includes("Consumer customization")) throw new Error("CLI diff modified a user-owned stylesheet.");
const generatedStylesheet = readFileSync(resolve(fixture, "src/components/inkwell/inkwell.css"), "utf8");
if (!generatedStylesheet.includes("inkwell.components")) throw new Error("Generated stylesheet lost its cascade layers.");
if (!generatedStylesheet.includes("font-family: var(--font-family-body)")) throw new Error("Generated stylesheet must apply Inkwell's semantic body font.");
for (const command of ["button", "checkbox", "checkbox-select", "card-header", "control-group", "control-trigger", "file-upload", "field-group", "form-field", "password-input", "popover", "select", "split-button", "tabs", "text-input", "textarea"]) {
  const independent = resolve(root, `.tmp-inkwell-cli-${command}`);
  removeFixture(independent);
  mkdirSync(resolve(independent, "src"), { recursive: true });
  writeFileSync(resolve(independent, "package.json"), JSON.stringify({ name: `inkwell-${command}-fixture`, private: true, type: "module", scripts: { build: "vite build" }, dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" }, devDependencies: { vite: "^8.0.0", "@vitejs/plugin-react": "^6.0.0" } }, null, 2));
  writeFileSync(resolve(independent, "index.html"), '<div id="root"></div><script type="module" src="/src/main.jsx"></script>');
  let result = spawnSync(process.execPath, [cli, "init"], { cwd: independent, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`CLI ${command} fixture init failed:\n${result.stderr}`);
  result = spawnSync(process.execPath, [cli, "add", command], { cwd: independent, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`CLI ${command} fixture add failed:\n${result.stderr}`);
  const files = readdirSync(resolve(independent, "src/components/inkwell")).filter((file) => /\.(tsx|ts|jsx)$/.test(file));
  assertLocalImportClosure(resolve(independent, "src/components/inkwell"), command);
  writeFileSync(resolve(independent, "src/main.jsx"), `${files.map((file) => `import "./components/inkwell/${file}";`).join("\n")}\n`);
  result = spawnSync(process.execPath, [resolve(root, "node_modules/vite/bin/vite.js"), "build"], { cwd: independent, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`CLI ${command} independent fixture build failed:\n${result.stderr}`);
  if (command === "button") {
    result = spawnSync(process.execPath, [cli, "add", "text-button"], { cwd: independent, encoding: "utf8" });
    if (result.status !== 0) throw new Error(`CLI could not reuse an installed shared source file:\n${result.stderr}`);
  }
  removeFixture(independent);
}
const configured = resolve(root, ".tmp-inkwell-cli-configured-fixture");
removeFixture(configured);
mkdirSync(configured, { recursive: true });
writeFileSync(resolve(configured, "package.json"), JSON.stringify({ name: "inkwell-cli-configured-fixture", private: true, dependencies: { react: "^19.0.0" } }, null, 2));
let configuredInit = spawnSync(process.execPath, [cli, "init"], { cwd: configured, encoding: "utf8" });
if (configuredInit.status !== 0) throw new Error(`Configured fixture init failed:\n${configuredInit.stderr}`);
const configPath = resolve(configured, "inkwell.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
config.components = "src/ui/inkwell";
config.stylesheet = "src/ui/inkwell/inkwell.css";
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
const originalStyle = resolve(configured, "src/components/inkwell/inkwell.css");
const configuredStyle = resolve(configured, config.stylesheet);
mkdirSync(resolve(configuredStyle, ".."), { recursive: true });
writeFileSync(configuredStyle, readFileSync(originalStyle));
removeFixture(resolve(configured, "src/components"));
configuredInit = spawnSync(process.execPath, [cli, "add", "card"], { cwd: configured, encoding: "utf8" });
if (configuredInit.status !== 0 || !existsSync(resolve(configured, "src/ui/inkwell/card.tsx"))) throw new Error(`Configured destination add failed:\n${configuredInit.stderr}`);
const fragmentsFixture = resolve(root, ".tmp-inkwell-cli-fragments-fixture");
removeFixture(fragmentsFixture);
mkdirSync(resolve(fragmentsFixture, "src"), { recursive: true });
writeFileSync(resolve(fragmentsFixture, "package.json"), JSON.stringify({ name: "inkwell-fragments-fixture", private: true, type: "module", dependencies: { react: "^19.0.0", "react-dom": "^19.0.0" }, devDependencies: { vite: "^8.0.0" } }, null, 2));
let fragmentResult = spawnSync(process.execPath, [cli, "init", "--css=fragments"], { cwd: fragmentsFixture, encoding: "utf8" });
if (fragmentResult.status !== 0) throw new Error(`Fragment fixture init failed:\n${fragmentResult.stderr}`);
fragmentResult = spawnSync(process.execPath, [cli, "add", "button"], { cwd: fragmentsFixture, encoding: "utf8" });
if (fragmentResult.status !== 0) throw new Error(`Fragment fixture button install failed:\n${fragmentResult.stderr}`);
const fragmentStylePath = resolve(fragmentsFixture, "src/components/inkwell/inkwell.css");
let fragmentStyle = readFileSync(fragmentStylePath, "utf8");
if (!fragmentStyle.includes(".primary-button") || !fragmentStyle.includes(".ink-spinner") || !fragmentStyle.includes(".sr-only")) throw new Error("Button fragments lack component or shared styles.");
if (fragmentStyle.includes(".ink-table-sort-button")) throw new Error("Button fragments unexpectedly include Table styles.");
if (fragmentStyle.length >= generatedStylesheet.length / 2) throw new Error("Button fragment stylesheet is not meaningfully smaller than the full stylesheet.");
fragmentResult = spawnSync(process.execPath, [cli, "add", "table"], { cwd: fragmentsFixture, encoding: "utf8" });
if (fragmentResult.status !== 0) throw new Error(`Fragment fixture incremental install failed:\n${fragmentResult.stderr}`);
fragmentStyle = readFileSync(fragmentStylePath, "utf8");
if (!fragmentStyle.includes(".ink-table-sort-button")) throw new Error("Incremental Table styles were not appended.");
if (fragmentStyle.split("Generated from src/styles/inkwell.css for shared.").length !== 2) throw new Error("Shared fragment was appended more than once.");
fragmentResult = spawnSync(process.execPath, [cli, "diff", "table"], { cwd: fragmentsFixture, encoding: "utf8" });
if (fragmentResult.status !== 0 || !fragmentResult.stdout.includes(`match Inkwell ${packageManifest.version}`)) throw new Error(`Fragment diff does not match fresh install:\n${fragmentResult.stderr}\n${fragmentResult.stdout}`);
const fragmentConfig = JSON.parse(readFileSync(resolve(fragmentsFixture, "inkwell.json"), "utf8"));
if (fragmentConfig.cssMode !== "fragments" || !fragmentConfig.installed.includes("css:table")) throw new Error("Fragment mode provenance is incomplete.");
writeFileSync(resolve(fragmentsFixture, "index.html"), '<div id="root"></div><script type="module" src="/src/main.jsx"></script>');
writeFileSync(resolve(fragmentsFixture, "src/main.jsx"), 'import { createRoot } from "react-dom/client"; import { Button } from "./components/inkwell/button"; import { Table } from "./components/inkwell/table"; import "./components/inkwell/inkwell.css"; createRoot(document.getElementById("root")).render(<main className="inkwell-page"><Button>Save</Button><Table columns={[{ id: "name", header: "Name", render: (row) => row.name }]} data={[{ id: 1, name: "Example" }]} getRowKey={(row) => row.id} /></main>);');
fragmentResult = spawnSync(process.execPath, [resolve(root, "node_modules/vite/bin/vite.js"), "build"], { cwd: fragmentsFixture, encoding: "utf8" });
if (fragmentResult.status !== 0) throw new Error(`Fragment fixture build failed:\n${fragmentResult.stderr}\n${fragmentResult.stdout}`);
removeFixture(fixture);
removeFixture(configured);
removeFixture(fragmentsFixture);
console.log("CLI fixture: init, add, full/fragment CSS, version, diff, no-overwrite, and Vite build passed.");
