import { ModalFrame } from "./ui.jsx";

export default {
  title: "Components/Modal Frame",
};

export const ModalPlayground = {
  name: "Playground",
  args: {
    title: "Share workspace",
    size: "default",
  },
  argTypes: {
    title: { control: "text" },
    size: { control: { type: "select" }, options: ["default", "compact"] },
  },
  render: ({ title, size }) => (
    <ModalFrame id="modal-demo" titleId="modal-demo-title" title={title} size={size} open onClose={() => {}}>
      <div style={{ display: "grid", gap: "12px" }}>
        <p id="modal-demo-copy" style={{ margin: 0 }}>
          Modals should focus on one decision, one form, or one constrained workflow.
        </p>
      </div>
    </ModalFrame>
  ),
};
