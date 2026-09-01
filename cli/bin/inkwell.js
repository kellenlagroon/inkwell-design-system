#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { registry } from "../registry.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configName = "inkwell.json";
const guidanceName = "inkwell.ai.md";
const defaultConfig = { $schema: "https://inkwell.design/schema.json", components: "src/components/inkwell", stylesheet: "src/components/inkwell/inkwell.css", installed: [] };

function fail(message) { throw new Error(message); }
function readJson(path, description) { try { return JSON.parse(readFileSync(path, "utf8")); } catch { fail(`Could not read ${description}: ${path}`); } }
function writeNew(path, content) { if (existsSync(path)) fail(`Refusing to overwrite user-owned file: ${relative(process.cwd(), path)}`); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content, "utf8"); }
function configPath(cwd) { return join(cwd, configName); }
function loadConfig(cwd) { const path = configPath(cwd); if (!existsSync(path)) fail(`No ${configName} found. Run \`npx @lagroon/inkwell-design-system init\` first.`); return readJson(path, configName); }
function validateProject(cwd) {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) fail("No package.json found. Run init from a React project root.");
  const pkg = readJson(pkgPath, "package.json");
  const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
  if (!deps.react) fail("Inkwell source components require React. Add react to package.json, then run init again.");
  return pkg;
}
function styleHeader() { return "/* Inkwell source-owned stylesheet. Created by `inkwell init`; component fragments are appended by `inkwell add`. */\n"; }
function componentNames(requested) {
  const names = new Set();
  const visit = (name) => { const item = registry[name]; if (!item) fail(`Unknown component: ${name}. Available: ${Object.keys(registry).join(", ")}`); if (names.has(name)) return; for (const dep of item.dependsOn) visit(dep); names.add(name); };
  requested.forEach(visit); return [...names];
}
function rewriteImports(source, fileName) {
  // Sources install flat, so their local imports remain sibling-relative.
  return source;
}
function isInside(cwd, path) { const value = relative(cwd, path); return value && !value.startsWith("..") && !value.includes(":"); }
function validateDestination(cwd, path, label) { if (!isInside(cwd, path)) fail(`${label} must stay inside the project root.`); }
function installPackages(cwd, names) {
  if (!names.length) return;
  const result = spawnSync("npm", ["install", ...names], { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) fail(`npm install failed while adding: ${names.join(", ")}`);
}
function init(cwd) {
  validateProject(cwd);
  const configFile = configPath(cwd);
  if (existsSync(configFile)) fail(`${configName} already exists; Inkwell will not overwrite configuration.`);
  const config = structuredClone(defaultConfig);
  const stylesheet = resolve(cwd, config.stylesheet);
  const guidance = resolve(cwd, guidanceName);
  validateDestination(cwd, stylesheet, "Stylesheet");
  validateDestination(cwd, guidance, "Guidance file");
  writeNew(stylesheet, `${styleHeader()}\n${readFileSync(join(root, "generated", "tokens.css"), "utf8")}\n${readFileSync(join(root, "styles", "base.css"), "utf8")}\n`);
  writeNew(guidance, readFileSync(join(root, "generated", "inkwell.ai.md"), "utf8"));
  writeNew(configFile, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`Created ${configName}, ${config.stylesheet}, and ${guidanceName}.`);
  console.log("Required fonts: load Source Sans 3 and League Spartan (weights 400–800) before the Inkwell stylesheet. See inkwell.ai.md for an import example.");
  console.log(`For an AI coding assistant, reference ${guidanceName} from your project's AGENTS.md, CLAUDE.md, or equivalent instructions.`);
  console.log("Next: npx @lagroon/inkwell-design-system add button");
}
function add(cwd, requested) {
  if (!requested.length) fail("Specify at least one component, for example: inkwell add button card");
  validateProject(cwd);
  const config = loadConfig(cwd);
  if (!Array.isArray(config.installed) || typeof config.components !== "string" || typeof config.stylesheet !== "string") fail(`Invalid ${configName}. Expected components, stylesheet, and installed fields.`);
  const names = componentNames(requested);
  const componentDir = resolve(cwd, config.components);
  const stylesheet = resolve(cwd, config.stylesheet);
  validateDestination(cwd, componentDir, "Component destination");
  validateDestination(cwd, stylesheet, "Stylesheet");
  if (!existsSync(stylesheet)) fail(`Stylesheet is missing: ${config.stylesheet}. Inkwell will not recreate or overwrite it.`);
  const files = [...new Set(names.flatMap((name) => registry[name].files))].map((file) => ({ file }));
  for (const { file } of files) if (existsSync(join(componentDir, file))) fail(`Refusing to overwrite user-owned file: ${join(config.components, file)}`);
  const packages = [...new Set(names.flatMap((name) => Object.entries(registry[name].packages).map(([pkg, version]) => `${pkg}@${version}`)))];
  installPackages(cwd, packages);
  for (const { file } of files) {
    const source = readFileSync(join(root, "generated", "components", file), "utf8");
    writeNew(join(componentDir, file), rewriteImports(source, file));
  }
  const existing = new Set(config.installed);
  const css = [...new Set(names.flatMap((name) => registry[name].css))].filter((name) => !existing.has(`css:${name}`));
  if (css.length) appendFileSync(stylesheet, `\n/* Added by inkwell add: ${names.join(", ")} */\n${css.map((name) => readFileSync(join(root, "styles", `${name}.css`), "utf8")).join("\n")}\n`, "utf8");
  config.installed = [...new Set([...config.installed, ...names, ...css.map((name) => `css:${name}`)])];
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`, "utf8");
  console.log(`Added ${names.join(", ")} to ${config.components}.`);
}

try {
  const [command, ...args] = process.argv.slice(2);
  if (command === "init") init(process.cwd());
  else if (command === "add") add(process.cwd(), args);
  else fail("Usage: inkwell init | inkwell add <component...>");
} catch (error) { console.error(`inkwell: ${error.message}`); process.exitCode = 1; }
