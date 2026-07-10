import { Inline } from "./layout";

export default {
  title: "Components/Inline/Features",
};

const Box = ({ children }) => (
  <div
    style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-rounded)",
      padding: "var(--space-2) var(--space-4)",
      color: "var(--color-text-primary)",
      fontSize: "0.84rem",
    }}
  >
    {children}
  </div>
);

export const Justify = {
  name: "Justify",
  render: () => (
    <div style={{ display: "grid", gap: 16, padding: 24, maxWidth: 480 }}>
      {["start", "center", "end", "between"].map((justify) => (
        <div key={justify}>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{justify}</p>
          <Inline gap="sm" justify={justify}>
            <Box>One</Box>
            <Box>Two</Box>
            <Box>Three</Box>
          </Inline>
        </div>
      ))}
    </div>
  ),
};

export const Wrapping = {
  name: "Wrapping",
  render: () => (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <Inline gap="sm">
        {["Alabama", "Georgia", "Ohio State", "Michigan", "Clemson", "Texas", "Oregon"].map((t) => (
          <Box key={t}>{t}</Box>
        ))}
      </Inline>
    </div>
  ),
};
