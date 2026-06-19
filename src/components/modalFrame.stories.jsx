import { Button, ModalFrame } from "./ui.jsx";

export default {
  title: "Components/ModalFrame",
};

export const ModalFramePlayground = {
  name: "Playground",
  args: {
    title: "Create a poll round",
    size: "default",
  },
  argTypes: {
    title: { control: "text", name: "Title" },
    size: {
      control: { type: "select" },
      name: "Size",
      options: ["default", "compact", "picker", "settings"],
    },
  },
  render: ({ title, size }) => (
    <ModalFrame
      id="playgroundModal"
      titleId="playgroundModalTitle"
      title={title}
      onClose={() => {}}
      size={size}
      open
    >
      <p className="subtle">Switch Size in Controls to preview each modal variant.</p>
      <Button>Confirm</Button>
    </ModalFrame>
  ),
};
