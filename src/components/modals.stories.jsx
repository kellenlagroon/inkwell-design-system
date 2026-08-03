import { useState } from "react";
import { Button } from "./ui";
import { ModalFrame } from "./modalFrame";

export default {
  title: "Patterns/Modals",
};

export const DangerModal = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ padding: 24 }}>
          <Button variant="danger" onClick={() => setOpen(true)}>Delete project…</Button>
          <ModalFrame
            id="danger-pattern-modal"
            titleId="danger-pattern-modal-title"
            title="Delete project"
            size="compact"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div style={{ display: "grid", gap: "12px" }}>
              <p className="subtle" style={{ margin: 0 }}>
                Use a danger modal for irreversible actions that need a final confirmation step.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Button variant="danger" onClick={() => setOpen(false)}>Delete project</Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </div>
          </ModalFrame>
        </div>
      );
    }
    return <Demo />;
  },
};
