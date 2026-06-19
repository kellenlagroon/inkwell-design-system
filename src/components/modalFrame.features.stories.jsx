import { Button, ModalFrame } from "./ui.jsx";

export default {
  title: "Components/ModalFrame/Features",
};

export const ModalFrameOpen = {
  render: () => (
    <ModalFrame
      id="storybookModal"
      titleId="storybookModalTitle"
      title="Create a poll round"
      onClose={() => {}}
      open
    >
      <form className="stacked-form">
        <label>
          Round name
          <input type="text" placeholder="Week 8 Coaches Poll" />
        </label>
        <Button type="submit">Create round</Button>
      </form>
    </ModalFrame>
  ),
};

export const ModalFrameCompact = {
  render: () => (
    <ModalFrame
      id="storybookCompactModal"
      titleId="storybookCompactModalTitle"
      title="Open a poll round"
      onClose={() => {}}
      size="compact"
      open
    >
      <p className="subtle">Compact modals are used for single-action forms.</p>
      <Button type="button">Confirm</Button>
    </ModalFrame>
  ),
};

export const ModalFramePicker = {
  render: () => (
    <ModalFrame
      id="storybookPickerModal"
      titleId="storybookPickerModalTitle"
      title="Select a team"
      onClose={() => {}}
      size="picker"
      open
    >
      <p className="subtle">Picker modals appear as bottom sheets on mobile.</p>
    </ModalFrame>
  ),
};

export const ModalFrameSettings = {
  render: () => (
    <ModalFrame
      id="storybookSettingsModal"
      titleId="storybookSettingsModalTitle"
      title="League settings"
      onClose={() => {}}
      size="settings"
      open
    >
      <p className="subtle">Settings modals are full-height sheets.</p>
    </ModalFrame>
  ),
};
