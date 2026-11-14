import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const TOKEN_FILE = resolve("tokens/inkwell.tokens.json");
const SNAPSHOT_FILE = resolve("tokens/figma-sync.snapshot.json");
const PROBE_NAME = /^token\|(root|dark|light)\|(--[a-z0-9-]+)\|(color|spacing|radius)$/;

function nodesUnder(node) {
  return [node, ...(node.children ?? []).flatMap(nodesUnder)];
}

function colorValue(paint) {
  if (paint?.type !== "SOLID" || !paint.color) throw new Error("Token probe needs a solid fill");
  const rgb = [paint.color.r, paint.color.g, paint.color.b].map((channel) => {
    if (!Number.isFinite(channel) || channel < 0 || channel > 1) throw new Error("Invalid color channel");
    return Math.round(channel * 255);
  });
  const alpha = Math.round((paint.opacity ?? 1) * (paint.color.a ?? 1) * 10_000) / 10_000;
  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) throw new Error("Invalid color alpha");
  return alpha === 1
    ? `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`
    : `rgba(${rgb.join(", ")}, ${alpha})`;
}

function floatValue(value) {
  if (!Number.isFinite(value) || value < 0) throw new Error("Invalid spacing or radius value");
  return `${value}px`;
}

/** Read the reactive Token Sync probes from Figma's GET /v1/files/:key response. */
export function extractProbeValues(file, expected) {
  const page = file?.document?.children?.find((node) => node.type === "CANVAS" && node.name === "Token Sync");
  if (!page) throw new Error("Figma file is missing the Token Sync page");
  const values = { root: {}, dark: {}, light: {} };
  for (const node of nodesUnder(page)) {
    if (!node.name?.startsWith("token|")) continue;
    const match = PROBE_NAME.exec(node.name);
    if (!match) throw new Error(`Invalid token probe name: ${node.name}`);
    const [, mode, cssName, kind] = match;
    const name = cssName.slice(2);
    if (Object.hasOwn(values[mode], name)) throw new Error(`Duplicate token probe: ${mode}/${name}`);
    if (!Object.hasOwn(expected[mode] ?? {}, name)) throw new Error(`Unexpected token probe: ${mode}/${name}`);

    let value;
    if (kind === "color") {
      const paint = node.fills?.find((fill) => fill.type === "SOLID" && fill.visible !== false);
      if (!paint?.boundVariables?.color) throw new Error(`Unbound color probe: ${node.name}`);
      value = colorValue(paint);
    } else if (kind === "spacing") {
      if (!node.boundVariables?.paddingLeft) throw new Error(`Unbound spacing probe: ${node.name}`);
      value = floatValue(node.paddingLeft);
    } else {
      if (!node.boundVariables?.topLeftRadius && !node.boundVariables?.cornerRadius) {
        throw new Error(`Unbound radius probe: ${node.name}`);
      }
      value = floatValue(node.cornerRadius ?? node.rectangleCornerRadii?.[0]);
    }
    values[mode][name] = value;
  }

  for (const [mode, tokens] of Object.entries(expected)) {
    for (const name of Object.keys(tokens)) {
      if (!Object.hasOwn(values[mode], name)) throw new Error(`Missing token probe: ${mode}/${name}`);
    }
  }
  return values;
}

function findToken(source, mode, name) {
  const groups = mode === "root" ? source.root : source.themes?.[mode];
  if (!groups) throw new Error(`Missing token mode: ${mode}`);
  const matches = groups.filter((group) => Object.hasOwn(group.tokens, name));
  if (matches.length !== 1) throw new Error(`Expected one token source for ${mode}/${name}; found ${matches.length}`);
  return matches[0].tokens;
}

function keepsAlias(current, mode, nextValue, values) {
  const reference = /^var\(--([a-z0-9-]+)\)$/.exec(current)?.[1];
  if (!reference) return false;
  return nextValue === (values[mode]?.[reference] ?? values.root?.[reference]);
}

/** Update only values changed in Figma since the last reviewed snapshot. */
export function planTokenSync(source, snapshot, nextValues) {
  const changes = [];
  for (const [mode, previousTokens] of Object.entries(snapshot.values)) {
    for (const [name, previous] of Object.entries(previousTokens)) {
      const next = nextValues[mode]?.[name];
      if (next === undefined) throw new Error(`Missing next value: ${mode}/${name}`);
      if (next === previous) continue;
      const tokens = findToken(source, mode, name);
      const current = tokens[name];
      const sourceUpdated = current !== next && !keepsAlias(current, mode, next, nextValues);
      if (sourceUpdated) tokens[name] = next;
      changes.push({ mode, name, previous, next, sourceUpdated });
    }
  }
  snapshot.values = nextValues;
  return changes;
}

async function fetchFigmaFile(fileKey) {
  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error("FIGMA_TOKEN is required to read the published Figma file");
  const response = await fetch(`https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!response.ok) throw new Error(`Figma file request failed: HTTP ${response.status}`);
  return response.json();
}

function writeJson(path, value, original) {
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  const content = `${JSON.stringify(value, null, 2)}\n`.replaceAll("\n", eol);
  if (content !== original) writeFileSync(path, content);
}

async function main() {
  const sourceText = readFileSync(TOKEN_FILE, "utf8");
  const snapshotText = readFileSync(SNAPSHOT_FILE, "utf8");
  const source = JSON.parse(sourceText);
  const snapshot = JSON.parse(snapshotText);
  const fixture = process.env.FIGMA_FILE_JSON;
  const file = fixture ? JSON.parse(readFileSync(resolve(fixture), "utf8")) : await fetchFigmaFile(snapshot.fileKey);
  const nextValues = extractProbeValues(file, snapshot.values);
  const changes = planTokenSync(source, snapshot, nextValues);
  if (changes.length) {
    writeJson(TOKEN_FILE, source, sourceText);
    writeJson(SNAPSHOT_FILE, snapshot, snapshotText);
  }
  console.log(JSON.stringify({ changed: changes.length, sourceUpdated: changes.filter((change) => change.sourceUpdated).length, changes }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
