import { Tooltip } from "./tooltip";

export default {
  title: "Components/Tooltip",
};

export const Playground = {
  args: {
    content: "Submissions are private until results are published.",
    triggerLabel: "More information about submissions",
  },
  argTypes: {
    content: { control: "text" },
    triggerLabel: { control: "text" },
  },
  render: ({ content, triggerLabel }) => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Final submissions
        <Tooltip content={content} triggerLabel={triggerLabel} />
      </span>
    </div>
  ),
};
