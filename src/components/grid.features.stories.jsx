import { Grid } from "./layout";

export default {
  title: "Layout/Grid/Features",
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

export const Columns = {
  name: "Column counts",
  render: () => (
    <div style={{ display: "grid", gap: 24, padding: 24, maxWidth: 520 }}>
      {[2, 3, 4].map((columns) => (
        <div key={columns}>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{columns} columns</p>
          <Grid columns={columns} gap="sm">
            {Array.from({ length: columns }, (_, i) => (
              <Box key={i}>Cell {i + 1}</Box>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const EqualColumnsDontOverflow = {
  name: "Equal columns don’t overflow",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Grid columns={2} gap="md">
        <Box>Short</Box>
        <Box>A much longer label that would otherwise blow out the column width</Box>
      </Grid>
    </div>
  ),
};
