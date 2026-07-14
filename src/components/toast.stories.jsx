import { Toast } from "./ui.jsx";

export default {
  title: "Components/Toast",
};

export const ToastPlayground = {
  name: "Playground",
  args: {
    message: "Changes saved.",
    tone: "success",
  },
  argTypes: {
    message: { control: "text", name: "Message" },
    tone: {
      control: { type: "select" },
      name: "Tone",
      options: ["success", "error", "warning"],
    },
  },
  render: ({ message, tone }) => (
    <Toast id="playground" message={message} tone={tone} onDismiss={() => {}} />
  ),
};
