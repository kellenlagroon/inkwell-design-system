import { useState } from "react";
import { Button } from "./ui.jsx";
import { ModalFrame } from "./modalFrame";

export default {
  title: "Components/ModalFrame/Features",
};

/** A trigger button that opens one modal at a time, so focus management is demonstrable. */
function ModalTrigger({ triggerLabel, title, size, id, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <ModalFrame
        id={id}
        titleId={`${id}Title`}
        title={title}
        onClose={() => setOpen(false)}
        size={size}
        open={open}
      >
        {children}
      </ModalFrame>
    </div>
  );
}

export const ModalFrameOpen = {
  name: "Default",
  render: () => (
    <ModalTrigger triggerLabel="Create a poll round" title="Create a poll round" id="storybookModal">
      <form className="stacked-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Round name
          <input type="text" placeholder="Week 8 Coaches Poll" />
        </label>
        <Button type="submit">Create round</Button>
      </form>
    </ModalTrigger>
  ),
};

export const ModalFrameCompact = {
  name: "Compact",
  render: () => (
    <ModalTrigger triggerLabel="Open a poll round" title="Open a poll round" size="compact" id="storybookCompactModal">
      <p className="subtle">Compact modals are used for single-action forms.</p>
      <Button>Confirm</Button>
    </ModalTrigger>
  ),
};

export const ModalFramePicker = {
  name: "Picker",
  render: () => (
    <ModalTrigger triggerLabel="Select a team" title="Select a team" size="picker" id="storybookPickerModal">
      <p className="subtle">Picker modals share the compact sizing (app-specific bottom-sheet styling is not part of Inkwell).</p>
    </ModalTrigger>
  ),
};

export const ModalFrameSettings = {
  name: "Settings",
  render: () => (
    <ModalTrigger triggerLabel="League settings" title="League settings" size="settings" id="storybookSettingsModal">
      <p className="subtle">Settings modals are full-height sheets.</p>
    </ModalTrigger>
  ),
};
