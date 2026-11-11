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
    <ModalTrigger triggerLabel="Create a project" title="Create a project" id="storybookModal">
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack>
          <FormField label="Project name">
            <TextInput placeholder="Website refresh" />
          </FormField>
          <Button type="submit">Create project</Button>
        </Stack>
      </form>
    </ModalTrigger>
  ),
};

export const ModalFrameCompact = {
  name: "Compact",
  render: () => (
    <ModalTrigger triggerLabel="Archive project" title="Archive project" size="compact" id="storybookCompactModal">
      <p className="subtle">Archive this project and move it out of the active list?</p>
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
