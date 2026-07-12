import { Progress } from "./progress";

export default {
  title: "Components/Progress/Alternatives",
};

// ---------- Alt A: circular ring ----------
function CircularProgress({ value, label, size = 96, stroke = 8 }) {
  const percent = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const center = size / 2;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="color-mix(in srgb, var(--color-overlay-soft) 60%, transparent)"
            strokeWidth={stroke}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: "stroke-dashoffset 200ms ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text)",
            fontWeight: 700,
            fontSize: 18,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {percent}%
        </div>
      </div>
      {label ? <div style={{ color: "var(--text)" }}>{label}</div> : null}
    </div>
  );
}

// ---------- Alt A+B: circular ring with drifting stripe fill ----------
// CSS mask-composite approach — a striped background is carved into a ring by
// combining a radial-gradient (inner hole) and a conic-gradient (progress arc)
// as masks. Stripes drift via a plain CSS keyframe animation on
// `background-position`, which is far more reliable than SMIL in Chromium.
function StripedRingProgress({ value, label, size = 96, ringWidth = 10 }) {
  const percent = Math.max(0, Math.min(100, value));
  const progressDeg = (percent / 100) * 360;
  const outerR = size / 2;
  const innerR = outerR - ringWidth;
  const ringMask = `radial-gradient(circle, transparent ${innerR}px, black ${innerR + 0.5}px)`;
  const arcMask = `conic-gradient(from -90deg, black 0 ${progressDeg}deg, transparent ${progressDeg}deg 360deg)`;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <style>{`@keyframes ink-alt-hybrid-drift { to { background-position: 28px 28px; } }`}</style>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* Track: full ring, subtle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-overlay-soft) 60%, transparent)",
            maskImage: ringMask,
            WebkitMaskImage: ringMask,
          }}
        />
        {/* Progress arc: same ring shape, further clipped by the conic mask,
            filled with a repeating diagonal stripe that drifts. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `repeating-linear-gradient(
              -45deg,
              var(--accent) 0 8px,
              color-mix(in srgb, var(--accent) 78%, black) 8px 16px
            )`,
            backgroundSize: "28px 28px",
            animation: "ink-alt-hybrid-drift 1800ms linear infinite",
            maskImage: `${ringMask}, ${arcMask}`,
            WebkitMaskImage: `${ringMask}, ${arcMask}`,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            transition: "mask-image 200ms ease, -webkit-mask-image 200ms ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text)",
            fontWeight: 700,
            fontSize: 18,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {percent}%
        </div>
      </div>
      {label ? <div style={{ color: "var(--text)" }}>{label}</div> : null}
    </div>
  );
}

// ---------- Alt B: linear + moving barber-pole stripes ----------
function StripedProgress({ value, label }) {
  const percent = Math.max(0, Math.min(100, value));
  return (
    <div>
      <style>{`@keyframes ink-alt-stripes { to { background-position: 28px 0; } }`}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          color: "var(--muted)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{percent}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 10,
          borderRadius: 999,
          background: "color-mix(in srgb, var(--color-overlay-soft) 60%, transparent)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: 999,
            background: `repeating-linear-gradient(
              -45deg,
              var(--accent) 0 8px,
              color-mix(in srgb, var(--accent) 78%, black) 8px 16px
            )`,
            backgroundSize: "28px 28px",
            animation: "ink-alt-stripes 900ms linear infinite",
            transition: "width 200ms ease",
          }}
        />
      </div>
    </div>
  );
}

// ---------- Alt C: segmented pills ----------
function SegmentedProgress({ value, label, segments = 10 }) {
  const percent = Math.max(0, Math.min(100, value));
  const filled = Math.round((percent / 100) * segments);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          color: "var(--muted)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{percent}%</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              background:
                i < filled
                  ? "var(--accent)"
                  : "color-mix(in srgb, var(--color-overlay-soft) 60%, transparent)",
              transition: "background 150ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Side-by-side ----------
function AltRow({ title, description, children }) {
  return (
    <section style={{ display: "grid", gap: 8 }}>
      <header>
        <div style={{ color: "var(--text)", fontWeight: 700 }}>{title}</div>
        <div style={{ color: "var(--muted)", fontSize: "var(--font-size-sm)" }}>{description}</div>
      </header>
      <div style={{ marginTop: 4 }}>{children}</div>
    </section>
  );
}

export const Compare40 = {
  name: "All at 40%",
  render: () => (
    <div style={{ padding: 24, maxWidth: 520, display: "grid", gap: 28, color: "var(--text)" }}>
      <AltRow title="Baseline (current)" description="Solid brand fill on a subtle track, label + value above.">
        <Progress value={40} label="Uploading" />
      </AltRow>

      <AltRow
        title="Alt A — Circular ring"
        description="SVG ring, thick stroke, percent inside. Classic upload/download indicator."
      >
        <CircularProgress value={40} label="Uploading" />
      </AltRow>

      <AltRow
        title="Alt A+B — Circular ring with drifting stripes"
        description="Ring geometry from Alt A, filled with the drifting barber-pole texture from Alt B."
      >
        <StripedRingProgress value={40} label="Uploading" />
      </AltRow>

      <AltRow
        title="Alt B — Moving stripes"
        description="Same linear geometry, but the fill has diagonal stripes drifting to convey active motion."
      >
        <StripedProgress value={40} label="Uploading" />
      </AltRow>

      <AltRow
        title="Alt C — Segmented pills"
        description="10 discrete segments filling left-to-right. Reads chunkier and more stepped."
      >
        <SegmentedProgress value={40} label="Uploading" />
      </AltRow>
    </div>
  ),
};

export const CompareValues = {
  name: "Values 0 / 40 / 100",
  render: () => (
    <div style={{ padding: 24, maxWidth: 560, display: "grid", gap: 28, color: "var(--text)" }}>
      <AltRow title="Baseline (current)">
        <div style={{ display: "grid", gap: 12 }}>
          <Progress value={0} label="Not started" />
          <Progress value={40} label="Uploading" />
          <Progress value={100} label="Complete" />
        </div>
      </AltRow>

      <AltRow title="Alt A — Circular ring">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <CircularProgress value={0} label="" />
          <CircularProgress value={40} label="" />
          <CircularProgress value={100} label="" />
        </div>
      </AltRow>

      <AltRow title="Alt A+B — Circular ring with drifting stripes">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <StripedRingProgress value={0} label="" />
          <StripedRingProgress value={40} label="" />
          <StripedRingProgress value={100} label="" />
        </div>
      </AltRow>

      <AltRow title="Alt B — Moving stripes">
        <div style={{ display: "grid", gap: 12 }}>
          <StripedProgress value={0} label="Not started" />
          <StripedProgress value={40} label="Uploading" />
          <StripedProgress value={100} label="Complete" />
        </div>
      </AltRow>

      <AltRow title="Alt C — Segmented pills">
        <div style={{ display: "grid", gap: 12 }}>
          <SegmentedProgress value={0} label="Not started" />
          <SegmentedProgress value={40} label="Uploading" />
          <SegmentedProgress value={100} label="Complete" />
        </div>
      </AltRow>
    </div>
  ),
};
