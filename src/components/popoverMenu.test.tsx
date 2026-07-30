import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Popover, PopoverMenuItem } from "./popover";

function renderMenu() {
  const utils = render(
    <Popover
      mode="menu"
      placement="right"
      ariaLabel="Account"
      trigger={({ ref, open, onToggle, ...triggerProps }) => (
        <button ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle}>
          Account
        </button>
      )}
    >
      <PopoverMenuItem>Profile</PopoverMenuItem>
      <PopoverMenuItem>Sign out</PopoverMenuItem>
    </Popover>,
  );
  const trigger = utils.getByRole("button", { name: "Account" });
  return { trigger, ...utils };
}

const activeText = () => (document.activeElement as HTMLElement | null)?.textContent;

describe("Popover menu mode", () => {
  it("ArrowDown opens the menu and focuses the first item", () => {
    const { trigger, getByRole } = renderMenu();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(getByRole("menu", { name: "Account" }).className).toContain("ink-popover-panel--right");
    expect(activeText()).toBe("Profile");
  });

  it("ArrowDown/ArrowUp move between items and wrap", () => {
    const { trigger } = renderMenu();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" }); // Profile
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" }); // Sign out
    expect(activeText()).toBe("Sign out");
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" }); // wrap -> Profile
    expect(activeText()).toBe("Profile");
    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" }); // wrap -> Sign out
    expect(activeText()).toBe("Sign out");
  });

  it("Escape closes the menu and returns focus to the trigger", () => {
    const { trigger, queryByRole } = renderMenu();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
    expect(queryByRole("menu")).toBeNull();
  });
});
