import { Grid } from "./layout";

export default {
  title: "Layout/Grid",
};

const Box = ({ children }) => (
  <div
    style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border-default)",
      borderRadius: "var(--radius-sharp)",
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
    columns: 3,
  },
  argTypes: {
    gap: { control: { type: "select" }, options: ["none", "xs", "sm", "md", "lg", "xl"] },
    columns: { control: { type: "number", min: 1, max: 6 } },
  },
  render: ({ gap, columns }) => (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <Grid gap={gap} columns={columns}>
        {Array.from({ length: columns * 2 }, (_, i) => (
          <Box key={i}>Cell {i + 1}</Box>
        ))}
      </Grid>
    </div>
  ),
};
