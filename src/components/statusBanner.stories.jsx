import { StatusBanner } from "./ui.jsx";

export default {
  title: "Components/Status Banner",
};

export const BannerPlayground = {
  name: "Playground",
  args: {
    message: "Changes are saved automatically.",
    tone: "default",
  },
  argTypes: {
    message: { control: "text" },
    tone: { control: { type: "select" }, options: ["default", "warning", "error"] },
  },
  render: ({ message, tone }) => <StatusBanner message={message} tone={tone} onDismiss={() => {}} />,
};
