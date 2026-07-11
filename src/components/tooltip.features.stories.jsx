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
        content="Anonymized: individual coaches' ballots are never shown."
        trigger={
          <button type="button" className="secondary-button">
            Why anonymized?
          </button>
        }
      />
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
              <span>3. Average ballot rank</span>
            </span>
          }
        />
      </span>
    </div>
  ),
};
