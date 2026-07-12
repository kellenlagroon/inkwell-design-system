import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { PopoverMenu } from "./popoverMenu";

function renderMenu() {
  const utils = render(
    <PopoverMenu
      menuLabel="Account"
      trigger={({ open, onToggle }) => (
        <button aria-expanded={open} onClick={onToggle}>
          Account
        </button>
      )}
    >
      <button>Profile</button>
      <button>Sign out</button>
    </PopoverMenu>,
  );
  const trigger = utils.getByRole("button", { name: "Account" });
  return { trigger, ...utils };
}

const activeText = () => (document.activeElement as HTMLElement | null)?.textContent;

describe("PopoverMenu keyboard navigation", () => {
  it("ArrowDown opens the menu and focuses the first item", () => {
    const { trigger } = renderMenu();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
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
    const { trigger, container } = renderMenu();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
    expect(container.querySelector(".ink-popover-menu")?.className.includes("open")).toBe(false);
  });
});
