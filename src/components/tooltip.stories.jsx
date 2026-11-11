import { Tooltip } from "./tooltip";

export default {
  title: "Components/Tooltip",
};

export const Playground = {
  args: {
    content: "Archived records remain available for 90 days.",
    triggerLabel: "More information about the retention period",
  },
  argTypes: {
    content: { control: "text" },
    triggerLabel: { control: "text" },
  },
  render: ({ content, triggerLabel }) => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Retention period
        <Tooltip content={content} triggerLabel={triggerLabel} />
      </span>
    </div>
  ),
};
