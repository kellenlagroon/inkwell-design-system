import { Button, PopoverMenu } from "./ui.jsx";

export default {
  title: "Components/Popover Menu/Features",
};

export const ListMenu = {
  render: () => (
    <PopoverMenu
      trigger={({ onToggle }) => (
        <Button className="secondary-button" onClick={onToggle}>
          More options
        </Button>
      )}
    >
      <div className="popover-list">
        <div className="popover-item"><strong>Rename</strong>Update label and metadata</div>
        <div className="popover-item"><strong>Duplicate</strong>Create a working copy</div>
        <div className="popover-item"><strong>Archive</strong>Remove from active view</div>
      </div>
    </PopoverMenu>
  ),
};
