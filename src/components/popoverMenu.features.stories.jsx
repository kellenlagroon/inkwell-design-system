import { Button, PopoverMenu } from "./ui.jsx";

export default {
  title: "Components/PopoverMenu/Features",
};

export const PopoverMenuDefault = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <PopoverMenu
        trigger={({ open, onToggle }) => (
          <Button
            className="secondary-button"
            aria-haspopup="menu"
            aria-expanded={open ? "true" : "false"}
            onClick={onToggle}
          >
            Account ▾
          </Button>
        )}
        menuLabel="Account menu"
      >
        <div className="ink-popover-label">
          <strong>Jordan Fields</strong>
          <span>Google account</span>
        </div>
        <Button variant="ghost" className="ink-popover-action">Sign out</Button>
      </PopoverMenu>
    </div>
  ),
};

export const PopoverMenuDirectoryActions = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <PopoverMenu
        trigger={({ open, onToggle }) => (
          <Button
            className="ghost-button"
            aria-haspopup="menu"
            aria-expanded={open ? "true" : "false"}
            onClick={onToggle}
          >
            ···
          </Button>
        )}
        menuClassName="ink-popover-menu"
        popoverClassName="ink-popover-surface"
        menuLabel="Row actions"
      >
        <button className="ink-popover-item">
          <span className="ink-popover-item-icon">
            <svg viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" /></svg>
          </span>
          <span className="ink-popover-item-label">Edit member</span>
        </button>
        <button className="ink-popover-item danger">
          <span className="ink-popover-item-icon">
            <svg viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" /></svg>
          </span>
          <span className="ink-popover-item-label">Remove member</span>
        </button>
      </PopoverMenu>
    </div>
  ),
};
