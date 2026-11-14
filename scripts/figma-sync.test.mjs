import test from "node:test";
import assert from "node:assert/strict";
import { extractProbeValues, planTokenSync } from "./figma-sync.mjs";

const boundColor = (name, color, opacity = 1) => ({
  name,
  fills: [{ type: "SOLID", color, opacity, boundVariables: { color: { id: "variable" } } }],
});
const file = {
  document: {
    children: [{
      type: "CANVAS",
      name: "Token Sync",
      children: [{
        children: [
          boundColor("token|root|--ink-950|color", { r: 4 / 255, g: 4 / 255, b: 4 / 255 }),
          { name: "token|root|--space-1|spacing", paddingLeft: 4, boundVariables: { paddingLeft: { id: "variable" } } },
          { name: "token|root|--radius-sharp|radius", cornerRadius: 2, boundVariables: { topLeftRadius: { id: "variable" } } },
          boundColor("token|dark|--color-bg-base|color", { r: 4 / 255, g: 4 / 255, b: 4 / 255 }),
          boundColor("token|light|--color-bg-base|color", { r: 1, g: 1, b: 1 }),
          boundColor("token|dark|--button-secondary-bg|color", { r: 1, g: 1, b: 1 }, 0.03),
        ],
      }],
    }],
  },
};
const expected = {
  root: { "ink-950": "#040404", "space-1": "4px", "radius-sharp": "2px" },
  dark: { "color-bg-base": "#040404", "button-secondary-bg": "rgba(255, 255, 255, 0.03)" },
  light: { "color-bg-base": "#ffffff" },
};

test("extracts bound Figma probes in both themes", () => {
  assert.deepEqual(extractProbeValues(file, expected), expected);
});

test("rejects a detached probe instead of writing stale values", () => {
  const detached = structuredClone(file);
  delete detached.document.children[0].children[0].children[0].fills[0].boundVariables;
  assert.throws(() => extractProbeValues(detached, expected), /Unbound color probe/);
});

test("updates a changed primitive while keeping a matching semantic alias", () => {
  const source = {
    root: [{ tokens: { "ink-950": "#040404" } }],
    themes: { dark: [{ tokens: { "color-bg-base": "var(--ink-950)" } }], light: [] },
  };
  const snapshot = { values: { root: { "ink-950": "#040404" }, dark: { "color-bg-base": "#040404" }, light: {} } };
  const values = { root: { "ink-950": "#050505" }, dark: { "color-bg-base": "#050505" }, light: {} };
  const changes = planTokenSync(source, snapshot, values);
  assert.equal(source.root[0].tokens["ink-950"], "#050505");
  assert.equal(source.themes.dark[0].tokens["color-bg-base"], "var(--ink-950)");
  assert.deepEqual(changes.map((change) => change.sourceUpdated), [true, false]);
  assert.deepEqual(snapshot.values, values);
});

test("writes a direct semantic edit", () => {
  const source = { root: [], themes: { dark: [{ tokens: { "color-brand": "var(--crimson-900)" } }] } };
  const snapshot = { values: { dark: { "color-brand": "#73000a" } } };
  const values = { root: { "crimson-900": "#73000a" }, dark: { "color-brand": "#85000c" } };
  const changes = planTokenSync(source, snapshot, values);
  assert.equal(source.themes.dark[0].tokens["color-brand"], "#85000c");
  assert.equal(changes[0].sourceUpdated, true);
});
