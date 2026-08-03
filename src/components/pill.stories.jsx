import { Pill } from "./ui";

export default {
  title: "Components/Pill",
};

export const PillPlayground = {
  name: "Playground",
  args: {
    children: "Published",
    tone: "success",
    appearance: "borderless",
  },
  argTypes: {
    children: { control: "text", name: "Label" },
    tone: {
      control: { type: "select" },
      name: "Tone",
      options: ["neutral", "info", "brand", "success", "warning", "danger"],
    },
    appearance: { control: { type: "inline-radio" }, options: ["bordered", "borderless"] },
  },
  render: ({ children, tone, appearance }) => <Pill tone={tone} appearance={appearance}>{children}</Pill>,
};
