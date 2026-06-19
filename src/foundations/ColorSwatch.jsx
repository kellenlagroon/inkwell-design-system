export function ColorSwatch({ token, value, label }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 1fr", gap: "0 12px", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div style={{ width: 32, height: 32, borderRadius: 4, background: `var(${token}, ${value})`, border: "1px solid var(--color-border-subtle)", flexShrink: 0 }} />
      <code style={{ fontSize: "0.82rem" }}>{token}</code>
      <span style={{ color: "var(--color-text-secondary)", fontSize: "0.82rem", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}
