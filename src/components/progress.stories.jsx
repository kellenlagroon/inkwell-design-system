import { Progress } from "./progress";

export default {
  title: "Components/Progress",
};

export const Playground = {
  args: { value: 40, tone: "brand", size: "md", label: "Uploading", ariaLabel: "" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    tone: { control: "select", options: ["brand", "info", "success", "warning", "danger", "neutral"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    label: { control: "text" },
    ariaLabel: { control: "text" },
  },
  render: ({ value, tone, size, label, ariaLabel }) => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Progress
        value={value}
        tone={tone}
        size={size}
        label={label || undefined}
        ariaLabel={ariaLabel || undefined}
      />
    </div>
  ),
};
