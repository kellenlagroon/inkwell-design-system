import { Button, PopoverMenu } from "./ui.jsx";

export default {
  title: "Components/PopoverMenu",
};

export const PopoverMenuPlayground = {
  name: "Playground",
  args: {
    menuLabel: "Account menu",
    triggerLabel: "Account ▾",
  },
  argTypes: {
    menuLabel: { control: "text", name: "Menu aria-label" },
    triggerLabel: { control: "text", name: "Trigger label" },
  },
  render: ({ menuLabel, triggerLabel }) => (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
      <PopoverMenu
        trigger={({ open, onToggle }) => (
          <Button
            className="secondary-button"
            aria-haspopup="menu"
            aria-expanded={open ? "true" : "false"}
            onClick={onToggle}
          >
            {triggerLabel}
          </Button>
        )}
        menuLabel={menuLabel}
      >
        <div className="header-account-label">
          <strong>Jordan Fields</strong>
          <span>Google account</span>
        </div>
        <Button variant="ghost" className="header-account-menu-button">Sign out</Button>
      </PopoverMenu>
    </div>
  ),
};
