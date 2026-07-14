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
    <ModalTrigger triggerLabel="Create a review cycle" title="Create a review cycle" id="storybookModal">
      <form className="stacked-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Cycle name
          <input type="text" placeholder="Quarterly Planning Review" />
        </label>
        <Button type="submit">Create round</Button>
      </form>
    </ModalTrigger>
  ),
};

export const ModalFrameCompact = {
  name: "Compact",
  render: () => (
    <ModalTrigger triggerLabel="Open a review cycle" title="Open a review cycle" size="compact" id="storybookCompactModal">
      <p className="subtle">Compact modals are used for single-action forms.</p>
      <Button>Confirm</Button>
    </ModalTrigger>
  ),
};

export const ModalFramePicker = {
  name: "Picker",
  render: () => (
    <ModalTrigger triggerLabel="Select an item" title="Select an item" size="picker" id="storybookPickerModal">
      <p className="subtle">Picker modals share the compact sizing (app-specific bottom-sheet styling is not part of Inkwell).</p>
    </ModalTrigger>
  ),
};

export const ModalFrameSettings = {
  name: "Settings",
  render: () => (
    <ModalTrigger triggerLabel="Project settings" title="Project settings" size="settings" id="storybookSettingsModal">
      <p className="subtle">Settings modals are full-height sheets.</p>
    </ModalTrigger>
  ),
};
