import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import { cssFragmentByFile } from "../cli/registry.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "cli", "styles", "fragments");
if (relative(root, output).startsWith("..")) throw new Error("CSS fragment output must stay inside the repository.");

// First-class ownership is explicit. Keep this map in sync with the component
// source closures in cli/registry.mjs; the audit below catches used classes
// that have no owner. App-only selectors in the canonical stylesheet are left
// out of the opt-in fragment mode.
const owners = [
  ["cardHeader", /^ink-card-header/],
  ["checkboxSelect", /^checkbox-select/],
  ["controlGroup", /^ink-control-group/],
  ["controlTrigger", /^ink-control-trigger/],
  ["expandableContent", /^ink-expandable-content/],
  ["iconButton", /^icon-btn/],
  ["richTextSafe", /^ink-rich-text/],
  ["splitButton", /^split-button|^split-dropdown/],
  ["statusSummaryCompact", /^status-summary-compact/],
  ["statusBanner", /^status-banner|^banner-dismiss/],
  ["statusDetailsPopover", /^ink-status-details/],
  ["modalFrame", /^modal|^wide-modal/],
  ["avatar", /^ink-avatar/],
  ["badge", /^badge/],
  ["button", /^primary-button|^secondary-button|^ghost-button|^danger-button|^button|^text-button/],
  ["card", /^card|^ink-card(?!-header)/],
  ["collapsible", /^collapsible/],
  ["divider", /^ink-divider/],
  ["drawer", /^ink-drawer/],
  ["forms", /^field|^input|^textarea|^checkbox|^password-input|^file-upload|^helper-text/],
  ["layout", /^ink-grid|^ink-stack|^ink-inline|^ink-action-group|^inline-actions|^grid$|^stacked-form$/],
  ["list", /^ink-list/],
  ["nav", /^ink-nav/],
  ["pagination", /^ink-pagination/],
  ["pill", /^pill/],
  ["popover", /^ink-popover/],
  ["progress", /^ink-progress/],
  ["select", /^cselect|^selector-/],
  ["sidebar", /^ink-sidebar/],
  ["skeleton", /^ink-skeleton/],
  ["spinner", /^ink-spinner/],
  ["surface", /^ink-container|^ink-surface|^ink-center|^ink-padding|^surface/],
  ["table", /^ink-table/],
  ["tabs", /^ink-tab/],
  ["text", /^ink-text|^ink-heading|^ink-link|^eyebrow|^mini-label|^subtle$|^ink-line-clamp|^ink-wrap-anywhere|^ink-truncate/],
  ["tooltip", /^info-tooltip/],
  ["ui", /^section-heading|^panel|^empty-state|^toast/],
  ["shared", /^sr-only$/],
];

function ownerOf(selector) {
  const firstClass = /\.([a-zA-Z_][\w-]*)/.exec(selector)?.[1];
  if (!firstClass) return null;
  return owners.find(([, pattern]) => pattern.test(firstClass))?.[0] ?? null;
}

const source = postcss.parse(readFileSync(resolve(root, "src", "styles", "inkwell.css"), "utf8"));
const componentLayer = source.nodes.find((node) => node.type === "atrule" && node.name === "layer" && node.params === "inkwell.components");
if (!componentLayer) throw new Error("Expected the canonical inkwell.components CSS layer.");
const fragments = new Map();
const unmapped = new Map();
const sourceText = readdirSync(resolve(root, "src", "components"))
  .filter((file) => /\.(tsx|ts|jsx)$/.test(file) && !/\.(test|stories)\./.test(file))
  .map((file) => readFileSync(resolve(root, "src", "components", file), "utf8"))
  .join("\n");

function distribute(node) {
  if (node.type === "rule") {
    const groups = new Map();
    for (const selector of postcss.list.comma(node.selector)) {
      const owner = ownerOf(selector);
      if (!owner) {
        const firstClass = /\.([a-zA-Z_][\w-]*)/.exec(selector)?.[1];
        if (firstClass) unmapped.set(firstClass, node.source?.start?.line);
        continue;
      }
      groups.set(owner, [...(groups.get(owner) ?? []), selector]);
    }
    return new Map([...groups].map(([owner, selectors]) => [owner, node.clone({ selector: selectors.join(", ") })]));
  }
  if (node.type !== "atrule") return new Map();
  if (node.name === "keyframes") {
    const owner = node.params.includes("spinner") ? "spinner" : node.params.includes("skeleton") ? "skeleton" : node.params.includes("progress") ? "progress" : null;
    if (!owner) throw new Error(`Missing CLI CSS ownership for @keyframes ${node.params}`);
    return new Map([[owner, node.clone()]]);
  }
  if (!["media", "container", "supports"].includes(node.name)) throw new Error(`Unhandled CLI CSS at-rule: @${node.name}`);
  const grouped = new Map();
  for (const child of node.nodes ?? []) {
    for (const [owner, clone] of distribute(child)) grouped.set(owner, [...(grouped.get(owner) ?? []), clone]);
  }
  return new Map([...grouped].map(([owner, children]) => {
    const wrapper = node.clone({ nodes: [] });
    children.forEach((child) => wrapper.append(child));
    return [owner, wrapper];
  }));
}

for (const node of componentLayer.nodes) {
  for (const [owner, clone] of distribute(node)) fragments.set(owner, [...(fragments.get(owner) ?? []), clone]);
}
const usedUnmapped = [...unmapped].filter(([name]) => sourceText.includes(name));
if (usedUnmapped.length) throw new Error(`CSS classes used by component source have no fragment owner:\n${usedUnmapped.map(([name, line]) => `  ${name} (CSS line ${line})`).join("\n")}`);
// Every selector in the canonical stylesheet must belong to an exported
// component. An unowned class root is dead weight that still ships to
// consumers in the default (complete stylesheet) install mode — that is how
// ~3 KB of the seed application's CSS survived three cleanup passes. Keep this
// at zero: give the selector an owner above, or delete it.
if (unmapped.size) {
  throw new Error(
    `${unmapped.size} CSS class root(s) in src/styles/inkwell.css have no component owner.\n` +
      `Give each one an owner in the map above, or delete the rule:\n` +
      [...unmapped].map(([name, line]) => `  .${name} (CSS line ${line})`).join("\n"),
  );
}
const expected = new Set(["shared", ...Object.values(cssFragmentByFile).filter(Boolean)]);
for (const owner of fragments.keys()) if (!expected.has(owner)) throw new Error(`No registry source file owns CSS fragment: ${owner}`);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const owner of expected) {
  const layer = postcss.atRule({ name: "layer", params: "inkwell.components" });
  for (const node of fragments.get(owner) ?? []) layer.append(node);
  writeFileSync(resolve(output, `${owner}.css`), `/* Generated from src/styles/inkwell.css for ${owner}. */\n${layer.toString()}\n`);
}
console.log(`Generated ${expected.size} CLI CSS fragments; omitted ${unmapped.size} app-only class roots.`);
