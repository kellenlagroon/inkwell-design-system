import { Inline } from "./layout";

export default {
  title: "Layout/Inline",
};

const Box = ({ children }) => (
  <div
    style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-sharp)",
      padding: "var(--space-2) var(--space-4)",
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
    align: "center",
    justify: "start",
    wrap: true,
  },
  argTypes: {
    gap: { control: { type: "select" }, options: ["none", "xs", "sm", "md", "lg", "xl"] },
    align: { control: { type: "select" }, options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: { type: "select" }, options: ["start", "center", "end", "between", "around"] },
    wrap: { control: "boolean" },
  },
  render: ({ gap, align, justify, wrap }) => (
    <div style={{ padding: 24 }}>
      <Inline gap={gap} align={align} justify={justify} wrap={wrap}>
        <Box>Save</Box>
        <Box>Duplicate</Box>
        <Box>Delete</Box>
      </Inline>
    </div>
  ),
};
