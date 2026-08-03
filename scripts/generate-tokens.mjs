import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * Generates src/styles/tokens.css from the structured token source
 * tokens/inkwell.tokens.json.
 *
 * Source schema:
 *   {
 *     "root":   [ { "tier"?: 1|2|3, "label": string, "tokens": { name: value } }, ... ],
 *     "themes": { "<theme>": [ { "tier"?, "label", "tokens" }, ... ] }
 *   }
 *
 * `root` groups are theme-invariant (palette, spacing, radius, typography,
 * motion, z-index). Each theme's groups are emitted under
 * `:root, [data-theme="<theme>"]` for the first theme so it is the default;
 * additional themes are emitted only as data-attribute overrides.
 *
 * `tier` places a group in the three-tier model. Groups are emitted sorted by
 * tier with a banner introducing each one, so the generated CSS reads as three
 * sections regardless of how the source is ordered — the source stays grouped by
 * topic (all typography together) which is easier to edit. Order within a tier is
 * preserved. Groups with no tier (the legacy aliases) sort last, outside the model.
 *
 * Reordering is safe: custom properties resolve at use time, not declaration
 * time, so a Tier 2 token may reference a Tier 1 token emitted after it.
 */

const TIERS = {
  1: "Tier 1 · Primitives — raw values, no assigned meaning",
  2: "Tier 2 · Semantic — meaning and role; these are what components should use",
  3: "Tier 3 · Component — scoped to one component, built from Tier 2",
};

const root = resolve(process.cwd());
const sourcePath = resolve(root, "tokens", "inkwell.tokens.json");
const outputPath = resolve(root, "src", "styles", "tokens.css");
const source = JSON.parse(readFileSync(sourcePath, "utf8"));

function renderGroups(groups, indent = "  ") {
  let currentTier;
  // Stable sort by tier; untiered groups (legacy aliases) go last.
  const ordered = groups
    .map((group, index) => ({ group, index }))
    .sort((a, b) => (a.group.tier ?? 99) - (b.group.tier ?? 99) || a.index - b.index)
    .map((entry) => entry.group);
  return ordered
    .map((group) => {
      const lines = [];
      if (group.tier !== currentTier && TIERS[group.tier]) {
        const banner = TIERS[group.tier];
        lines.push(`${indent}/* ${"─".repeat(3)} ${banner} ${"─".repeat(3)} */`);
        lines.push("");
      }
      currentTier = group.tier;
      if (group.label) lines.push(`${indent}/* ${group.label} */`);
      for (const [name, value] of Object.entries(group.tokens)) {
        lines.push(`${indent}--${name}: ${value};`);
      }
      return lines.join("\n");
    })
    .join("\n\n");
}

function renderBlock(selector, groups) {
  return `${selector} {\n${renderGroups(groups)}\n}`;
}

const blocks = [renderBlock(":root", source.root)];

for (const [index, [theme, groups]] of Object.entries(source.themes ?? {}).entries()) {
  const selector = index === 0 ? `:root,\n[data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  blocks.push(renderBlock(selector, groups));
}

/*
 * Tokens ship inside a cascade layer for the same reason the component styles do:
 * unlayered CSS beats layered CSS, so a consumer overriding a token — the main
 * theming path — wins by default, including from inside their own layer.
 *
 * This file loads before inkwell.css, so it declares the full layer order.
 * inkwell.css re-declares its share, which is a harmless no-op once the order is
 * established.
 */
const header = [
  "/* Generated from tokens/inkwell.tokens.json — do not edit by hand. Run: npm run tokens */",
  "",
  "@layer inkwell.tokens, inkwell.base, inkwell.components;",
  "",
  "@layer inkwell.tokens {",
].join("\n");

const css = `${header}\n${blocks.join("\n\n")}\n}\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, css, "utf8");

const count = (groups) => groups.reduce((n, g) => n + Object.keys(g.tokens).length, 0);
const total =
  count(source.root) +
  Object.values(source.themes ?? {}).reduce((n, g) => n + count(g), 0);
console.log(`Generated ${outputPath} (${total} tokens)`);
