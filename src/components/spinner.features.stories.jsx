import { Spinner } from "./spinner";

export default {
  title: "Components/Spinner/Features",
};

export const Sizes = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Tones = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 16, alignItems: "center", color: "var(--text)" }}>
      <Spinner tone="muted" />
      <Spinner tone="brand" />
      <span style={{ color: "var(--danger)", display: "inline-flex", alignItems: "center", gap: 8 }}>
        <Spinner tone="current" /> Retrying
      </span>
    </div>
  ),
};

export const InlineWithLabel = {
  name: "Inline with label",
  render: () => (
    <div style={{ padding: 24, display: "inline-flex", gap: 8, alignItems: "center", color: "var(--text)" }}>
      <Spinner size="sm" decorative />
      <span>Loading content…</span>
    </div>
  ),
};
