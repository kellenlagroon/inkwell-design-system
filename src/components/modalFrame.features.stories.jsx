import { useState } from "react";
import { Button } from "./ui";
import { FormField, TextInput } from "./forms";
import { Stack } from "./layout";
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
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack>
          <FormField label="Cycle name">
            <TextInput placeholder="Quarterly Planning Review" />
          </FormField>
          <Button type="submit">Create round</Button>
        </Stack>
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

export const ModalFrameSettings = {
  name: "Settings",
  render: () => (
    <ModalTrigger triggerLabel="Project settings" title="Project settings" size="settings" id="storybookSettingsModal">
      <p className="subtle">Settings modals are full-height sheets.</p>
    </ModalTrigger>
  ),
};
