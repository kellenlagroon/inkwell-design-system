export default {
  title: "Tokens/Typography",
  parameters: { layout: "padded" },
};

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p style={{
      margin: "0 0 20px",
      fontSize: "var(--font-size-label-sm)",
      fontWeight: "var(--font-weight-label)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--color-text-secondary)",
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid var(--color-border-subtle)", margin: "40px 0" }} />;
}

// ── Typefaces ─────────────────────────────────────────────────────────────────

export const Typefaces = {
  name: "Typefaces",
  render: () => (
    <div style={{ padding: 32, maxWidth: 680 }}>

      <section style={{ marginBottom: 40 }}>
        <SectionLabel>Source Sans 3 — body</SectionLabel>
        <p style={{ margin: "0 0 8px", color: "var(--color-text-secondary)", fontSize: "var(--font-size-label)" }}>
          Paragraph text, labels, helper text, UI copy.
        </p>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "var(--font-size-body)",
          lineHeight: "var(--line-height-body)",
          fontWeight: "var(--font-weight-ui)",
          margin: 0,
          color: "var(--color-text-primary)",
        }}>
          The quick brown fox jumps over the lazy dog. 0123456789
        </p>
      </section>

      <section>
        <SectionLabel>League Spartan — display</SectionLabel>
        <p style={{ margin: "0 0 8px", color: "var(--color-text-secondary)", fontSize: "var(--font-size-label)" }}>
          Headings, section titles, prominent values, item names, and app titles.
        </p>
        <p style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: "var(--font-size-display)",
          lineHeight: "var(--line-height-display)",
          fontWeight: "var(--font-weight-display)",
          margin: 0,
          color: "var(--color-text-primary)",
        }}>
          Quarterly Planning Review
        </p>
      </section>

    </div>
  ),
};

// ── Type Scale ────────────────────────────────────────────────────────────────

const sizeScale = [
  { tier0: "--font-size-2xs", tier1: "--font-size-badge",      value: "0.62rem", usage: "Rank badge labels, count chips" },
  { tier0: "--font-size-xs",  tier1: "--font-size-caption",    value: "0.72rem", usage: "Timestamps, meta info" },
  { tier0: "--font-size-sm",  tier1: "--font-size-label-sm",   value: "0.78rem", usage: "Secondary labels, pill text, nav mobile" },
  { tier0: "--font-size-base",tier1: "--font-size-label",      value: "0.84rem", usage: "Primary labels, helper text, tooltips" },
  { tier0: "--font-size-md",  tier1: "--font-size-body",       value: "0.9rem",  usage: "Body text, nav items, standard UI copy" },
  { tier0: "--font-size-lg",  tier1: "--font-size-heading-sm", value: "1.08rem", usage: "Section headings, panel sub-titles" },
  { tier0: "--font-size-xl",  tier1: "--font-size-heading",    value: "1.28rem", usage: "Panel titles, page headings" },
  { tier0: "--font-size-2xl", tier1: "--font-size-display",    value: "1.55rem", usage: "App title, hero text" },
  { tier0: "--font-size-3xl", tier1: "--font-size-rank",       value: "1.65rem", usage: "Rank numbers (League Spartan)" },
];

export const TypeScale = {
  name: "Type Scale",
  render: () => (
    <div style={{ padding: 32 }}>
      <div style={{ overflowX: "auto", marginBottom: 32 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "var(--font-size-label)" }}>
          <thead>
            <tr>
              {["Tier 0 (scale)", "Tier 1 (semantic)", "Value", "Used for"].map(h => (
                <th key={h} style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  borderBottom: "1px solid var(--color-border-strong)",
                  color: "var(--color-text-secondary)",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeScale.map(({ tier0, tier1, value, usage }) => (
              <tr key={tier0}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <code style={{ fontSize: "var(--font-size-label-sm)" }}>{tier0}</code>
                </td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <code style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-brand-emphasis)" }}>{tier1}</code>
                </td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", fontFamily: "monospace", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>{value}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <div style={{ display: "grid", gap: 24 }}>
        {sizeScale.map(({ tier1, value, tier0 }) => {
          const isLeagueSpartan = tier0 === "--font-size-3xl";
          return (
            <div key={tier0} style={{ display: "flex", alignItems: "baseline", gap: 24, borderBottom: "1px solid var(--color-border-subtle)", paddingBottom: 16 }}>
              <div style={{ minWidth: 200 }}>
                <code style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-brand-emphasis)", display: "block" }}>{tier1}</code>
                <span style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>{value}</span>
              </div>
              <p style={{
                margin: 0,
                fontSize: `var(${tier0})`,
                fontFamily: isLeagueSpartan ? "'League Spartan', sans-serif" : "'Source Sans 3', sans-serif",
                fontWeight: isLeagueSpartan ? "var(--font-weight-display)" : "var(--font-weight-ui)",
                lineHeight: "var(--line-height-tight)",
                color: "var(--color-text-primary)",
              }}>
                {isLeagueSpartan ? "Week 8 — #1 Northstar" : "The quick brown fox jumps over the lazy dog"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

// ── Weights ───────────────────────────────────────────────────────────────────

const weights = [
  { tier0: "--font-weight-regular",   tier1: "--font-weight-—",       value: 400, usage: "De-emphasized UI text (coach name in picker)" },
  { tier0: "--font-weight-medium",    tier1: "--font-weight-—",       value: 500, usage: "Tooltip body text" },
  { tier0: "--font-weight-semibold",  tier1: "--font-weight-label",   value: 600, usage: "Labels, nav items, section subheadings" },
  { tier0: "--font-weight-bold",      tier1: "--font-weight-ui",      value: 700, usage: "Most UI elements, body headings" },
  { tier0: "--font-weight-extrabold", tier1: "--font-weight-display", value: 800, usage: "Rank numbers, app title, display headings" },
];

export const FontWeights = {
  name: "Font Weights",
  render: () => (
    <div style={{ padding: 32, maxWidth: 680 }}>
      <div style={{ display: "grid", gap: 20 }}>
        {weights.map(({ tier0, tier1, value, usage }) => {
          const hasSemantic = !tier1.includes("—");
          return (
            <div key={tier0} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "center", borderBottom: "1px solid var(--color-border-subtle)", paddingBottom: 16 }}>
              <div>
                <code style={{ fontSize: "var(--font-size-label-sm)", display: "block" }}>{tier0}</code>
                {hasSemantic && (
                  <code style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-brand-emphasis)", display: "block" }}>{tier1}</code>
                )}
                <span style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>{value}</span>
              </div>
              <div>
                <p style={{
                  margin: "0 0 4px",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "var(--font-size-body)",
                  fontWeight: `var(${tier0})`,
                  lineHeight: "var(--line-height-tight)",
                  color: "var(--color-text-primary)",
                }}>
                  The quick brown fox
                </p>
                <p style={{ margin: 0, fontSize: "var(--font-size-label-sm)", color: "var(--color-text-secondary)" }}>{usage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

// ── Line Heights ──────────────────────────────────────────────────────────────

const lineHeights = [
  { token: "--line-height-none",    value: 0,    usage: "Collapsed or hidden elements" },
  { token: "--line-height-tight",   value: 1,    usage: "Rank numbers, badge text, single-line UI chips" },
  { token: "--line-height-compact", value: 1.1,  usage: "Mobile nav labels, dense result row headings" },
  { token: "--line-height-display", value: 1.05, usage: "League Spartan headings, app title" },
  { token: "--line-height-heading", value: 1.2,  usage: "Section headings" },
  { token: "--line-height-label",   value: 1.3,  usage: "Label text, form copy" },
  { token: "--line-height-body",    value: 1.5,  usage: "Body prose, helper text, descriptions" },
];

export const LineHeights = {
  name: "Line Heights",
  render: () => (
    <div style={{ padding: 32, maxWidth: 680 }}>
      <div style={{ display: "grid", gap: 24 }}>
        {lineHeights.filter(({ value }) => value > 0).map(({ token, value, usage }) => (
          <div key={token} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, alignItems: "start", borderBottom: "1px solid var(--color-border-subtle)", paddingBottom: 20 }}>
            <div>
              <code style={{ fontSize: "var(--font-size-label-sm)", display: "block" }}>{token}</code>
              <span style={{ fontSize: "var(--font-size-label-sm)", color: "var(--color-text-secondary)", fontFamily: "monospace" }}>{value}</span>
            </div>
            <div>
              <p style={{
                margin: "0 0 8px",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "var(--font-size-body)",
                fontWeight: "var(--font-weight-ui)",
                lineHeight: `var(${token})`,
                color: "var(--color-text-primary)",
                maxWidth: 340,
              }}>
                Find an item, then choose its priority. Only one item may hold each position.
              </p>
              <p style={{ margin: 0, fontSize: "var(--font-size-label-sm)", color: "var(--color-text-secondary)" }}>{usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ── Applying typography ──────────────────────────────────────────────────────

export const ApplyingTypography = {
  name: "Applying typography",
  render: () => (
    <div style={{ padding: 32, maxWidth: 680, display: "grid", gap: 28 }}>
      <section>
        <SectionLabel>Start with semantic HTML</SectionLabel>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-body)", lineHeight: "var(--line-height-body)" }}>
          Use paragraphs, headings, strong text, and links for meaning. Apply typography tokens when a surface needs an intentional treatment.
        </p>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: "'League Spartan', sans-serif", fontSize: "var(--font-size-heading)", fontWeight: "var(--font-weight-display)", lineHeight: "var(--line-height-heading)", color: "var(--color-text-primary)" }}>
            Section heading
          </h2>
          <code style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-label-sm)" }}>heading + display family/weight + --line-height-heading</code>
        </div>
        <p style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-ui)", lineHeight: "var(--line-height-body)", color: "var(--color-text-primary)" }}>
          Body copy uses the semantic body size, the UI weight, and the body line height.
        </p>
        <p style={{ margin: 0, fontSize: "var(--font-size-label)", fontWeight: "var(--font-weight-label)", lineHeight: "var(--line-height-label)", color: "var(--color-text-secondary)" }}>
          Label and helper text uses the label recipe and a semantic text color.
        </p>
      </section>

      <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--font-size-label)", lineHeight: "var(--line-height-label)" }}>
        Use status colors only when the text communicates status. Wrapping, truncation, and line clamping are layout constraints—not default typography.
      </p>
    </div>
  ),
};
