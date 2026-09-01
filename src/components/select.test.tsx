import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Select, type SelectOption } from "./select";

const OPTIONS: SelectOption[] = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie", disabled: true },
  { value: "d", label: "Delta" },
];

function renderSelect(overrides: Partial<React.ComponentProps<typeof Select>> = {}) {
  const onChange = vi.fn();
  const utils = render(
    <Select value="a" onChange={onChange} options={OPTIONS} aria-label="pick" {...overrides} />,
  );
  const trigger = utils.getByRole("button", { name: "pick" });
  return { onChange, trigger, ...utils };
}

const activeText = () => (document.activeElement as HTMLElement | null)?.textContent;

describe("Select density", () => {
  it("exposes the shared control density contract", () => {
    const { trigger, rerender } = renderSelect({ density: "comfortable", variant: "control" });
    expect(trigger.className).toContain("ink-control-density--comfortable");
    rerender(<Select value="a" onChange={() => {}} options={OPTIONS} aria-label="pick" density="compact" variant="control" />);
    expect(trigger.className).toContain("ink-control-density--compact");
  });
});

describe("Select keyboard navigation", () => {
  it("opens on ArrowDown with the selected option active", () => {
    const { trigger, getByRole } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(getByRole("listbox")).toBeTruthy();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(activeText()).toBe("Alpha");
  });

  it("ArrowDown skips disabled options and wraps around", () => {
    const { trigger, getByRole } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const listbox = getByRole("listbox");
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(activeText()).toBe("Bravo");
    fireEvent.keyDown(listbox, { key: "ArrowDown" }); // skips disabled Charlie
    expect(activeText()).toBe("Delta");
    fireEvent.keyDown(listbox, { key: "ArrowDown" }); // wraps
    expect(activeText()).toBe("Alpha");
  });

  it("Home and End jump to the first and last enabled option", () => {
    const { trigger, getByRole } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const listbox = getByRole("listbox");
    fireEvent.keyDown(listbox, { key: "End" });
    expect(activeText()).toBe("Delta");
    fireEvent.keyDown(listbox, { key: "Home" });
    expect(activeText()).toBe("Alpha");
  });

  it("type-ahead jumps to a matching option", () => {
    const { trigger, getByRole } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(getByRole("listbox"), { key: "d" });
    expect(activeText()).toBe("Delta");
  });

  it("Enter selects the active option and returns focus to the trigger", () => {
    const { trigger, getByRole, queryByRole, onChange } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const listbox = getByRole("listbox");
    fireEvent.keyDown(listbox, { key: "ArrowDown" }); // Bravo
    fireEvent.keyDown(listbox, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("b");
    expect(queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("Escape closes without selecting and returns focus", () => {
    const { trigger, getByRole, queryByRole, onChange } = renderSelect();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(getByRole("listbox"), { key: "Escape" });
    expect(queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(onChange).not.toHaveBeenCalled();
  });
});
