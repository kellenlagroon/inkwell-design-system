import { ColorSwatch } from "./ColorSwatch.jsx";

export default {
  title: "Tokens/Color/Palettes",
  parameters: { layout: "padded" },
};

function SwatchGroup({ heading, swatches }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ margin: "0 0 4px", fontSize: "0.9rem", fontFamily: "inherit", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{heading}</h3>
      {swatches.map((s) => <ColorSwatch key={s.token} {...s} />)}
    </div>
  );
}

export const Palette = {
  name: "Tier 1 Palette",
  render: () => (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "inherit" }}>Color — Primitives (Tier 1)</h2>
      <p style={{ margin: "0 0 32px", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
        Raw palette tokens named by hue and scale, not by intent. Tier 2 semantic tokens reference these; component rules should not.
      </p>
      <SwatchGroup heading="Ink" swatches={[
        { token: "--ink-950", value: "#040404" },
        { token: "--ink-940", value: "#090909" },
        { token: "--ink-930", value: "#0a0a0a" },
        { token: "--ink-900", value: "#0d0d0d" },
        { token: "--ink-880", value: "#101010" },
        { token: "--ink-850", value: "#151515" },
      ]} />
      <SwatchGroup heading="Cream" swatches={[
        { token: "--cream-97", value: "#fbf5ec" },
        { token: "--cream-95", value: "#f4ede2" },
      ]} />
      <SwatchGroup heading="Zinc" swatches={[
        { token: "--zinc-600", value: "#a1a1aa" },
      ]} />
      <SwatchGroup heading="Crimson" swatches={[
        { token: "--crimson-900", value: "#73000a" },
        { token: "--crimson-800", value: "#940010" },
        { token: "--crimson-600", value: "#c83f4a" },
      ]} />
      <SwatchGroup heading="Steel" swatches={[
        { token: "--steel-400", value: "#6f8fb5" },
      ]} />
      <SwatchGroup heading="Sage" swatches={[
        { token: "--sage-400", value: "#7ab089" },
      ]} />
      <SwatchGroup heading="Coral" swatches={[
        { token: "--coral-500", value: "#d56d57" },
        { token: "--coral-200", value: "#ffb6a7" },
      ]} />
      <SwatchGroup heading="Amber" swatches={[
        { token: "--amber-400", value: "#cfae43" },
      ]} />
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "0.9rem", fontFamily: "inherit", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Alpha scales</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.84rem" }}>
            <thead>
              <tr>
                {["Token", "Value"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--color-border-strong)", color: "var(--color-text-secondary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "--white-a3",  value: "rgba(255, 255, 255, 0.03)" },
                { token: "--white-a5",  value: "rgba(255, 255, 255, 0.05)" },
                { token: "--cream-a7",  value: "rgba(255, 238, 223, 0.07)" },
                { token: "--cream-a8",  value: "rgba(255, 238, 223, 0.08)" },
                { token: "--cream-a12", value: "rgba(255, 238, 223, 0.12)" },
                { token: "--cream-a16", value: "rgba(255, 238, 223, 0.16)" },
                { token: "--cream-a28", value: "rgba(255, 238, 223, 0.28)" },
                { token: "--steel-a20", value: "rgba(111, 143, 181, 0.20)" },
                { token: "--steel-a22", value: "rgba(111, 143, 181, 0.22)" },
                { token: "--steel-a30", value: "rgba(111, 143, 181, 0.30)" },
                { token: "--steel-a72", value: "rgba(111, 143, 181, 0.72)" },
                { token: "--black-a58", value: "rgba(0, 0, 0, 0.58)" },
              ].map(({ token, value }) => (
                <tr key={token}>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)" }}><code style={{ fontSize: "0.82rem" }}>{token}</code></td>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", fontFamily: "monospace", color: "var(--color-text-secondary)" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};
