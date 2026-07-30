import { StatusBanner } from "./ui";

export default {
  title: "Components/StatusBanner",
};

export const StatusBannerPlayground = {
  name: "Playground",
  args: {
    message: "Changes saved successfully.",
    tone: "success",
    dismissible: true,
  },
  argTypes: {
    message: { control: "text", name: "Message" },
    tone: {
      control: { type: "select" },
      name: "Tone",
      options: ["success", "warning", "error"],
    },
    dismissible: { control: "boolean", name: "Show dismiss button" },
  },
  render: ({ message, tone, dismissible }) => (
    <StatusBanner message={message} tone={tone} onDismiss={dismissible ? () => {} : undefined} />
  ),
};
