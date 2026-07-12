import { Tooltip } from "./tooltip";

export default {
  title: "Components/Tooltip",
};

export const Playground = {
  args: {
    content: "Ballots are anonymized before results are published.",
    triggerLabel: "More information about ballots",
  },
  argTypes: {
    content: { control: "text" },
    triggerLabel: { control: "text" },
  },
  render: ({ content, triggerLabel }) => (
    <div style={{ padding: 64, display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-text-primary)" }}>
        Final ballots
        <Tooltip content={content} triggerLabel={triggerLabel} />
      </span>
    </div>
  ),
};
