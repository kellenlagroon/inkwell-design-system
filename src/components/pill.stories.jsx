import { Pill } from "./ui.jsx";

export default {
  title: "Components/Pill",
};

export const PillPlayground = {
  name: "Playground",
  args: {
    children: "Published",
    tone: "success",
  },
  argTypes: {
    children: { control: "text", name: "Label" },
    tone: {
      control: { type: "select" },
      name: "Tone",
      options: ["default", "success", "warning", "danger"],
    },
  },
  render: ({ children, tone }) => <Pill tone={tone}>{children}</Pill>,
};
