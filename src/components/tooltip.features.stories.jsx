import { Tooltip } from "./tooltip";

export default {
  title: "Components/Tooltip/Features",
};

export const DefaultTrigger = {
  name: "Info trigger",
  render: () => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Retention period
        <Tooltip
          content="Archived records remain available for 90 days."
          triggerLabel="More information about the retention period"
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
        content="Only workspace members can open this link."
        trigger={
          <button type="button" className="secondary-button">
            Who can open this?
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
        Export contents
        <Tooltip
          triggerLabel="More information about the export"
          content={
            <span style={{ display: "grid", gap: 4 }}>
              <strong>Included in the export</strong>
              <span>Record titles</span>
              <span>Statuses</span>
              <span>Last updated dates</span>
            </span>
          }
        />
      </span>
    </div>
  ),
};
