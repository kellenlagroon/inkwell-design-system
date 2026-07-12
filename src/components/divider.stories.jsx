import { Divider } from "./divider";

export default {
  title: "Components/Divider",
};

export const Playground = {
  args: {
    orientation: "horizontal",
    label: "",
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    label: { control: "text" },
  },
  render: ({ orientation, label }) => (
    <div style={{ padding: 24, maxWidth: 420, color: "var(--color-text-primary)" }}>
      {orientation === "vertical" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 40 }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      ) : (
        <>
          <p style={{ margin: "0 0 12px" }}>Above the rule.</p>
          <Divider label={label || undefined} />
          <p style={{ margin: "12px 0 0" }}>Below the rule.</p>
        </>
      )}
    </div>
  ),
};
