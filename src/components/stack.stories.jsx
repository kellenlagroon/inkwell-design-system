import { Stack } from "./layout";

export default {
  title: "Components/Stack",
};

const Box = ({ children }) => (
  <div
    style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-rounded)",
      padding: "var(--space-3) var(--space-4)",
      color: "var(--color-text-primary)",
      fontSize: "0.84rem",
    }}
  >
    {children}
  </div>
);

export const Playground = {
  args: {
    gap: "md",
    align: "stretch",
  },
  argTypes: {
    gap: { control: { type: "select" }, options: ["none", "xs", "sm", "md", "lg", "xl"] },
    align: { control: { type: "select" }, options: ["start", "center", "end", "stretch"] },
  },
  render: ({ gap, align }) => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Stack gap={gap} align={align}>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </Stack>
    </div>
  ),
};
