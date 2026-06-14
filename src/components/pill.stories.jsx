import { Pill } from "./ui.jsx";

export default {
  title: "Components/Pill",
};

export const PillPlayground = {
  name: "Playground",
  args: {
    children: "Beta",
    tone: "default",
  },
  argTypes: {
    children: { control: "text" },
    tone: { control: { type: "select" }, options: ["default", "success", "warning", "danger"] },
  },
  render: ({ children, tone }) => <Pill tone={tone}>{children}</Pill>,
};
