import { Tooltip } from "./tooltip";

export default {
  title: "Components/Tooltip/Features",
};

export const DefaultTrigger = {
  name: "Info trigger",
  render: () => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Strength of schedule
        <Tooltip
          content="A weighted measure of opponent quality across the season."
          triggerLabel="More information about strength of schedule"
        />
      </span>
    </div>
  ),
};

export const CustomTrigger = {
  name: "Custom trigger",
  render: () => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <Tooltip
        content="Private: individual submissions are never shown."
        trigger={
          <button type="button" className="secondary-button">
            Why anonymized?
          </button>
        }
      />
    </div>
  ),
};

export const Placements = {
  name: "Placement",
  render: () => (
    <div
      style={{
        padding: 120,
        display: "grid",
        gridTemplateColumns: "repeat(2, max-content)",
        gap: 64,
        justifyContent: "center",
        color: "var(--color-text-primary)",
      }}
    >
      {["top", "bottom", "left", "right"].map((placement) => (
        <span key={placement} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {placement}
          <Tooltip
            placement={placement}
            content={`Placed on the ${placement}.`}
            triggerLabel={`More information (${placement})`}
          />
        </span>
      ))}
    </div>
  ),
};

export const RichContent = {
  name: "Rich content",
  render: () => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Tiebreakers
        <Tooltip
          triggerLabel="More information about tiebreakers"
          content={
            <span style={{ display: "grid", gap: 4 }}>
              <strong>Applied in order:</strong>
              <span>1. Head-to-head result</span>
              <span>2. Total first-place votes</span>
              <span>3. Average submission rank</span>
            </span>
          }
        />
      </span>
    </div>
  ),
};
