import { Button, PopoverMenu } from "./ui.jsx";

export default {
  title: "Components/Popover Menu",
};

export const PopoverPlayground = {
  name: "Playground",
  render: () => (
    <PopoverMenu
      trigger={({ onToggle }) => (
        <Button className="secondary-button" onClick={onToggle}>
          Open menu
        </Button>
      )}
    >
      <div className="popover-list">
        <div className="popover-item"><strong>Profile</strong>Account details</div>
        <div className="popover-item"><strong>Preferences</strong>Workspace settings</div>
      </div>
    </PopoverMenu>
  ),
};
