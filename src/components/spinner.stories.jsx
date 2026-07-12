import { Spinner } from "./spinner";

export default {
  title: "Components/Spinner",
};

export const Playground = {
  args: { size: "md", tone: "muted", label: "Loading" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "inline-radio", options: ["muted", "brand", "current"] },
    label: { control: "text" },
  },
  render: ({ size, tone, label }) => (
    <div style={{ padding: 24 }}>
      <Spinner size={size} tone={tone} label={label} />
    </div>
  ),
};
