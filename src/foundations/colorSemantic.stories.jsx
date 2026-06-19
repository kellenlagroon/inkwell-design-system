import { ColorSwatch } from "./ColorSwatch.jsx";

export default {
  title: "Foundations/Color/Semantic",
  parameters: { layout: "padded" },
};

function SwatchGroup({ heading, swatches }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ margin: "0 0 4px", fontSize: "0.9rem", fontFamily: "inherit", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{heading}</h3>
      {swatches.map((s) => <ColorSwatch key={s.token} {...s} />)}
    </div>
  );
}

export const SemanticTokens = {
  name: "Semantic Tokens",
  render: () => (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "inherit" }}>Color — Semantic (Tier 1)</h2>
      <p style={{ margin: "0 0 32px", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
        Each token maps to a Tier 0 palette name and carries a role-based meaning. Use these — never raw Tier 0 tokens — in component rules.
      </p>
      <SwatchGroup heading="Backgrounds" swatches={[
        { token: "--color-bg-base",        value: "#040404" },
        { token: "--color-bg-canvas-alt",  value: "#090909" },
        { token: "--color-bg-canvas",      value: "#0a0a0a" },
      ]} />
      <SwatchGroup heading="Surfaces" swatches={[
        { token: "--color-surface-default", value: "#0d0d0d" },
        { token: "--color-surface-raised",  value: "#101010" },
        { token: "--color-surface-active",  value: "#151515" },
      ]} />
      <SwatchGroup heading="Text" swatches={[
        { token: "--color-text-primary",   value: "#f4ede2" },
        { token: "--color-text-strong",    value: "#fbf5ec" },
        { token: "--color-text-secondary", value: "#a1a1aa" },
        { token: "--color-text-inverse",   value: "#0a0a0a" },
      ]} />
      <SwatchGroup heading="Brand" swatches={[
        { token: "--color-brand",          value: "#73000a" },
        { token: "--color-brand-hover",    value: "#940010" },
        { token: "--color-brand-emphasis", value: "#c83f4a" },
        { token: "--color-brand-soft",     value: "color-mix(in srgb, #73000a 18%, transparent)" },
      ]} />
      <SwatchGroup heading="Semantic status" swatches={[
        { token: "--color-info",         value: "#6f8fb5" },
        { token: "--color-success",      value: "#7ab089" },
        { token: "--color-warning",      value: "#cfae43" },
        { token: "--color-danger",       value: "#d56d57" },
        { token: "--color-danger-text",  value: "#ffb6a7" },
        { token: "--color-info-soft",    value: "rgba(111, 143, 181, 0.20)" },
        { token: "--color-success-soft", value: "color-mix(in srgb, #7ab089 16%, transparent)" },
        { token: "--color-warning-soft", value: "color-mix(in srgb, #cfae43 14%, transparent)" },
        { token: "--color-danger-soft",  value: "color-mix(in srgb, #d56d57 18%, transparent)" },
      ]} />
      <SwatchGroup heading="Borders" swatches={[
        { token: "--color-border-subtle",      value: "rgba(255, 238, 223, 0.08)" },
        { token: "--color-border-default",     value: "rgba(255, 238, 223, 0.12)" },
        { token: "--color-border-strong",      value: "rgba(255, 238, 223, 0.16)" },
        { token: "--color-border-interactive", value: "rgba(255, 238, 223, 0.28)" },
      ]} />
      <SwatchGroup heading="Focus" swatches={[
        { token: "--color-focus-outline-soft", value: "rgba(111, 143, 181, 0.22)" },
        { token: "--color-focus-outline",      value: "rgba(111, 143, 181, 0.30)" },
        { token: "--color-focus-ring",         value: "rgba(111, 143, 181, 0.72)" },
      ]} />
      <SwatchGroup heading="Overlays" swatches={[
        { token: "--color-overlay-soft",   value: "rgba(255, 255, 255, 0.03)" },
        { token: "--color-overlay-strong", value: "rgba(255, 255, 255, 0.05)" },
        { token: "--color-hover-surface",  value: "rgba(255, 238, 223, 0.07)" },
        { token: "--color-scrim",          value: "rgba(0, 0, 0, 0.58)" },
      ]} />
    </div>
  ),
};
