export default {
  title: "Tokens/Radius",
  parameters: { layout: "padded" },
};

const radiusTokens = [
  { token: "--radius-none",             value: "0",          usage: "Roster rows, rail dividers" },
  { token: "--radius-sharp",            value: "2px",        usage: "Buttons, panels, modals, most UI chrome" },
  { token: "--radius-rounded",          value: "12px",       usage: "Form inputs (generic select, input)" },
  { token: "--radius-pill",             value: "999px",      usage: "Pills, nav badges, avatar circles" },
  { token: "--radius-device-frame",     value: "28px",       usage: "Tablet/mobile preview chrome" },
  { token: "--radius-dialog-prominent", value: "18px",       usage: "Danger modal on mobile" },
  { token: "--radius-sheet-top",        value: "2px 2px 0 0", usage: "Bottom-sheet modals (rounded top only)" },
];

const swatchTokens = radiusTokens.slice(0, 4);

export const BorderRadiusScale = {
  name: "Border Radius Scale",
  render: () => (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "inherit" }}>Border Radius</h2>
      <div style={{ overflowX: "auto", marginBottom: 32 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.84rem" }}>
          <thead>
            <tr>
              {["Token", "Value", "Usage"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--color-border-strong)", color: "var(--color-text-secondary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {radiusTokens.map(({ token, value, usage }) => (
              <tr key={token}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)" }}><code style={{ fontSize: "0.82rem" }}>{token}</code></td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", fontFamily: "monospace" }}>{value}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {swatchTokens.map(({ token, value }) => (
          <div key={token} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border-strong)",
                borderRadius: `var(${token})`,
              }}
            />
            <code style={{ fontSize: "0.75rem" }}>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
