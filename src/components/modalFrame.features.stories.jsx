import { Button, ModalFrame } from "./ui.jsx";

export default {
  title: "Components/Modal Frame/Features",
};

export const DefaultModal = {
  render: () => (
    <ModalFrame id="modal-default" titleId="modal-default-title" title="Share workspace" open onClose={() => {}}>
      <div style={{ display: "grid", gap: "12px" }}>
        <p style={{ margin: 0 }}>Use the default size for forms and review steps with moderate content depth.</p>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button>Send invite</Button>
          <Button className="ghost-button">Cancel</Button>
        </div>
      </div>
    </ModalFrame>
  ),
};

export const CompactModal = {
  render: () => (
    <ModalFrame id="modal-compact" titleId="modal-compact-title" title="Archive item" size="compact" open onClose={() => {}}>
      <p style={{ margin: 0 }}>Use compact modals for focused confirmations.</p>
    </ModalFrame>
  ),
};
