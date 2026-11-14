#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { registry } from "../registry.mjs";
import { unifiedDiff } from "../diff.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configName = "inkwell.json";
const guidanceName = "inkwell.ai.md";
const packageVersion = JSON.parse(readFileSync(resolve(root, "..", "package.json"), "utf8")).version;
const defaultConfig = { $schema: "https://inkwell.design/schema.json", components: "src/components/inkwell", stylesheet: "src/components/inkwell/inkwell.css", cssMode: "full", installed: [], sourceVersions: {}, sourceFiles: {} };

function fail(message) { throw new Error(message); }
function readJson(path, description) { try { return JSON.parse(readFileSync(path, "utf8")); } catch { fail(`Could not read ${description}: ${path}`); } }
function writeNew(path, content) { if (existsSync(path)) fail(`Refusing to overwrite user-owned file: ${relative(process.cwd(), path)}`); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content, "utf8"); }
function hash(content) { return createHash("sha256").update(content).digest("hex"); }
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
function init(cwd, args) {
  if (args.length > 1 || (args[0] && !["--css=full", "--css=fragments"].includes(args[0]))) fail("Usage: inkwell init [--css=fragments]");
  validateProject(cwd);
  const configFile = configPath(cwd);
  if (existsSync(configFile)) fail(`${configName} already exists; Inkwell will not overwrite configuration.`);
  const config = structuredClone(defaultConfig);
  config.cssMode = args[0] === "--css=fragments" ? "fragments" : "full";
  config.initializedWith = packageVersion;
  const stylesheet = resolve(cwd, config.stylesheet);
  const guidance = resolve(cwd, guidanceName);
  validateDestination(cwd, stylesheet, "Stylesheet");
  validateDestination(cwd, guidance, "Guidance file");
  writeNew(stylesheet, `${styleHeader()}\n${readFileSync(join(root, "generated", "tokens.css"), "utf8")}\n${readFileSync(join(root, "styles", "base.css"), "utf8")}\n`);
  writeNew(guidance, readFileSync(join(root, "generated", "inkwell.ai.md"), "utf8"));
  writeNew(configFile, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`Created ${configName}, ${config.stylesheet}, and ${guidanceName}.`);
  console.log(`CSS mode: ${config.cssMode}.`);
  console.log("Required fonts: load Source Sans 3 and League Spartan (weights 400–800) before the Inkwell stylesheet. See inkwell.ai.md for an import example.");
  console.log(`For an AI coding assistant, reference ${guidanceName} from your project's AGENTS.md, CLAUDE.md, or equivalent instructions.`);
  console.log("Next: npx @lagroon/inkwell-design-system add button");
}
function add(cwd, requested) {
  if (!requested.length) fail("Specify at least one component, for example: inkwell add button card");
  validateProject(cwd);
  const config = loadConfig(cwd);
  if (!Array.isArray(config.installed) || typeof config.components !== "string" || typeof config.stylesheet !== "string") fail(`Invalid ${configName}. Expected components, stylesheet, and installed fields.`);
  const cssMode = config.cssMode ?? "full";
  if (!["full", "fragments"].includes(cssMode)) fail(`Invalid ${configName}: cssMode must be full or fragments.`);
  if (cssMode === "fragments" && config.installed.includes("css:all-components")) fail("Cannot change cssMode after installing the full stylesheet.");
  if (cssMode === "full" && config.installed.some((name) => name.startsWith("css:") && name !== "css:all-components")) fail("Cannot change cssMode after installing CSS fragments.");
  const names = componentNames(requested);
  for (const name of requested) if (config.installed.includes(name)) fail(`Refusing to overwrite already installed component: ${name}`);
  const componentDir = resolve(cwd, config.components);
  const stylesheet = resolve(cwd, config.stylesheet);
  validateDestination(cwd, componentDir, "Component destination");
  validateDestination(cwd, stylesheet, "Stylesheet");
  if (!existsSync(stylesheet)) fail(`Stylesheet is missing: ${config.stylesheet}. Inkwell will not recreate or overwrite it.`);
  const alreadyInstalled = config.installed.filter((name) => !name.startsWith("css:"));
  const ownedFiles = new Set(alreadyInstalled.flatMap((name) => registry[name]?.files ?? []));
  const files = [...new Set(names.flatMap((name) => registry[name].files))];
  for (const file of files) {
    const path = join(componentDir, file);
    if (ownedFiles.has(file) && !existsSync(path)) fail(`Previously installed dependency is missing: ${join(config.components, file)}`);
    if (!ownedFiles.has(file) && existsSync(path)) fail(`Refusing to overwrite user-owned file: ${join(config.components, file)}`);
  }
  const packages = [...new Set(names.flatMap((name) => Object.entries(registry[name].packages).map(([pkg, version]) => `${pkg}@${version}`)))];
  installPackages(cwd, packages);
  for (const file of files.filter((file) => !ownedFiles.has(file))) {
    const source = readFileSync(join(root, "generated", "components", file), "utf8");
    const installedSource = rewriteImports(source, file);
    writeNew(join(componentDir, file), installedSource);
    config.sourceFiles ??= {};
    config.sourceFiles[file] = { version: packageVersion, sha256: hash(installedSource) };
  }
  const existing = new Set(config.installed);
  const css = [...new Set(cssMode === "full" ? ["all-components"] : names.flatMap((name) => registry[name].css))].filter((name) => !existing.has(`css:${name}`));
  if (css.length) {
    appendFileSync(stylesheet, `\n/* Added by inkwell add: ${names.join(", ")} */\n${css.map((name) => readFileSync(join(root, "styles", cssMode === "full" ? `${name}.css` : join("fragments", `${name}.css`)), "utf8")).join("\n")}\n`, "utf8");
    config.cssInstallOrder ??= [];
    config.cssInstallOrder.push({ names, fragments: css });
  }
  config.installed = [...new Set([...config.installed, ...names, ...css.map((name) => `css:${name}`)])];
  config.sourceVersions ??= {};
  for (const name of names) if (!config.sourceVersions[name]) config.sourceVersions[name] = packageVersion;
  if (css.length) config.stylesheetSource = { version: packageVersion, sha256: hash(readFileSync(stylesheet, "utf8")) };
  writeFileSync(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`, "utf8");
  console.log(`Added ${names.join(", ")} to ${config.components}.`);
}

function inspectedFiles(cwd, config, requested) {
  const names = requested.length ? componentNames(requested) : config.installed.filter((name) => !name.startsWith("css:"));
  const installed = new Set(config.installed);
  for (const name of names) if (!installed.has(name)) fail(`${name} is not installed in this project.`);
  const componentDir = resolve(cwd, config.components);
  validateDestination(cwd, componentDir, "Component destination");
  return [...new Set(names.flatMap((name) => registry[name].files))].sort();
}

function version(cwd) {
  const config = loadConfig(cwd);
  console.log(`Inkwell CLI package: ${packageVersion}`);
  console.log(`CSS mode: ${config.cssMode ?? "full"}`);
  console.log(`Initialized with: ${config.initializedWith ?? "unknown (older installation)"}`);
  const names = config.installed.filter((name) => !name.startsWith("css:"));
  if (!names.length) { console.log("No source components recorded."); return; }
  for (const name of names) console.log(`${name}: added with ${config.sourceVersions?.[name] ?? "unknown (older installation)"}`);
  const files = inspectedFiles(cwd, config, []);
  const changed = files.filter((file) => {
    const local = resolve(cwd, config.components, file);
    const recorded = config.sourceFiles?.[file]?.sha256;
    return recorded && (!existsSync(local) || hash(readFileSync(local, "utf8")) !== recorded);
  });
  if (changed.length) console.log(`Locally changed source files: ${changed.join(", ")}`);
  const fileVersions = [...new Set(files.map((file) => config.sourceFiles?.[file]?.version).filter(Boolean))];
  if (fileVersions.length > 1) console.log(`Shared source files span versions: ${fileVersions.join(", ")}. See sourceFiles in ${configName}.`);
  if (config.stylesheetSource?.sha256) {
    const stylesheet = resolve(cwd, config.stylesheet);
    validateDestination(cwd, stylesheet, "Stylesheet");
    if (!existsSync(stylesheet) || hash(readFileSync(stylesheet, "utf8")) !== config.stylesheetSource.sha256) console.log("Locally changed stylesheet.");
  }
  console.log("Use `inkwell diff` to review local files against this CLI package; no files are changed.");
}

function diff(cwd, requested) {
  const config = loadConfig(cwd);
  const files = inspectedFiles(cwd, config, requested);
  const componentDir = resolve(cwd, config.components);
  let differences = 0;
  for (const file of files) {
    const local = join(componentDir, file);
    const current = join(root, "generated", "components", file);
    const before = existsSync(local) ? readFileSync(local, "utf8") : "";
    const after = readFileSync(current, "utf8");
    const result = unifiedDiff(before, after, `${config.components}/${file} (local)`, `${file} (${packageVersion})`);
    if (result) { process.stdout.write(result); differences++; }
  }
  if (config.installed.some((name) => name.startsWith("css:"))) {
    const stylesheet = resolve(cwd, config.stylesheet);
    validateDestination(cwd, stylesheet, "Stylesheet");
    const before = existsSync(stylesheet) ? readFileSync(stylesheet, "utf8") : "";
    let after = `${styleHeader()}\n${readFileSync(join(root, "generated", "tokens.css"), "utf8")}\n${readFileSync(join(root, "styles", "base.css"), "utf8")}\n`;
    const installOrder = config.cssInstallOrder?.length
      ? config.cssInstallOrder
      : [{ names: ["components"], fragments: ["all-components"] }];
    for (const entry of installOrder) {
      const marker = config.cssInstallOrder?.length
        ? `/* Added by inkwell add: ${entry.names.join(", ")} */`
        : before.match(/\/\* Added by inkwell add: [^\n]+ \*\//)?.[0] ?? "/* Added by inkwell add: components */";
      const contents = entry.fragments.map((name) => readFileSync(join(root, "styles", name === "all-components" ? `${name}.css` : join("fragments", `${name}.css`)), "utf8")).join("\n");
      after += `\n${marker}\n${contents}\n`;
    }
    const result = unifiedDiff(before, after, `${config.stylesheet} (local)`, `stylesheet (${packageVersion})`);
    if (result) { process.stdout.write(result); differences++; }
  }
  if (!differences) console.log(`Installed source and stylesheet match Inkwell ${packageVersion}.`);
  console.log("Diff is read-only; merge upstream changes into your owned files manually.");
}

try {
  const [command, ...args] = process.argv.slice(2);
  if (command === "init") init(process.cwd(), args);
  else if (command === "add") add(process.cwd(), args);
  else if (command === "version") version(process.cwd());
  else if (command === "diff") diff(process.cwd(), args);
  else fail("Usage: inkwell init [--css=fragments] | inkwell add <component...> | inkwell version | inkwell diff [component...]");
} catch (error) { console.error(`inkwell: ${error.message}`); process.exitCode = 1; }
