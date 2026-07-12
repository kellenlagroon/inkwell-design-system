import { Stack } from "./layout";

export default {
  title: "Components/Stack/Features",
};

const Box = ({ children, w }) => (
  <div
    style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-rounded)",
      padding: "var(--space-2) var(--space-4)",
      color: "var(--color-text-primary)",
      fontSize: "0.84rem",
      width: w,
    }}
  >
    {children}
  </div>
);

export const GapScale = {
  name: "Gap scale",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24, flexWrap: "wrap" }}>
      {["xs", "sm", "md", "lg", "xl"].map((gap) => (
        <div key={gap}>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{gap}</p>
          <Stack gap={gap}>
            <Box>One</Box>
            <Box>Two</Box>
            <Box>Three</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Alignment = {
  name: "Alignment",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24, flexWrap: "wrap" }}>
      {["start", "center", "end", "stretch"].map((align) => (
        <div key={align} style={{ width: 200 }}>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{align}</p>
          <Stack gap="sm" align={align}>
            <Box>Short</Box>
            <Box>A longer item</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};
