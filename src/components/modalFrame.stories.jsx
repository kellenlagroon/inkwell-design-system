import { useState } from "react";
import { Button } from "./ui.jsx";
import { ModalFrame } from "./modalFrame";

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
  render: ({ title, size }) => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <ModalFrame
            id="playgroundModal"
            titleId="playgroundModalTitle"
            title={title}
            onClose={() => setOpen(false)}
            size={size}
            open={open}
          >
            <p className="subtle">Focus is trapped here; press Esc or Close to return focus to the trigger.</p>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFrame>
        </div>
      );
    }
    return <Demo />;
  },
};
