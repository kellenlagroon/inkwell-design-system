import { Button, ModalFrame } from "./ui.jsx";

export default {
  title: "Patterns/Modals",
};

export const DangerModal = {
  render: () => (
    <ModalFrame
      id="danger-pattern-modal"
      titleId="danger-pattern-modal-title"
      title="Delete workspace"
      size="compact"
      open
      onClose={() => {}}
    >
      <div style={{ display: "grid", gap: "12px" }}>
        <p className="subtle" style={{ margin: 0 }}>
          Use a danger modal for irreversible actions that need a final confirmation step.
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button className="danger-button">Delete workspace</Button>
          <Button className="ghost-button">Cancel</Button>
        </div>
      </div>
    </ModalFrame>
  ),
};
