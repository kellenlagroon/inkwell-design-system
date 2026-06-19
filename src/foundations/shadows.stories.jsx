export default {
  title: "Foundations/Shadows",
  parameters: { layout: "padded" },
};

const shadowTokens = [
  { token: "--shadow",         value: "0 22px 54px rgba(0,0,0,0.34)", usage: "Panels, preview toolbar, toast" },
  { token: "--popover-shadow", value: "0 18px 40px rgba(0,0,0,0.38)", usage: "Popovers, account menu" },
];

export const ShadowElevations = {
  name: "Shadow Elevations",
  render: () => (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "inherit" }}>Shadows</h2>
      <p style={{ margin: "0 0 32px", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
        Two elevation levels. Both use deep black drops tuned for the dark surface palette.
      </p>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {shadowTokens.map(({ token, value, usage }) => (
          <div key={token} style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                width: 140,
                height: 88,
                background: "var(--color-surface-raised)",
                borderRadius: 2,
                boxShadow: value,
              }}
            />
            <code style={{ fontSize: "0.78rem" }}>{token}</code>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>{usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
