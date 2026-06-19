export default {
  title: "Foundations/Spacing",
  parameters: { layout: "padded" },
};

const tokens = [
  { token: "--space-1", value: "4px" },
  { token: "--space-2", value: "8px" },
  { token: "--space-3", value: "12px" },
  { token: "--space-4", value: "16px" },
  { token: "--space-5", value: "20px" },
  { token: "--space-6", value: "24px" },
];

export const SpacingScale = {
  name: "Spacing Scale",
  render: () => (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "inherit" }}>Spacing</h2>
      <p style={{ margin: "0 0 24px", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
        Six named steps built on a 4 px base unit. Use these tokens for margin, padding, and gap — never hard-code raw pixel values.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        {tokens.map(({ token, value }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: `var(${token})`,
                height: 8,
                background: "var(--color-brand-emphasis)",
                borderRadius: 2,
                flexShrink: 0,
                minWidth: 4,
              }}
            />
            <code style={{ minWidth: 110, fontSize: "0.82rem" }}>{token}</code>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "0.82rem" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
