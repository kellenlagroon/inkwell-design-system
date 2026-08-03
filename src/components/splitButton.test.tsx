import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { SplitButton } from "./splitButton";

const ITEMS = [
  { label: "Review cycle", description: "Reviewers prioritise items" },
  { label: "Multi-category", description: "Choose across categories" },
];

const activeText = () => (document.activeElement as HTMLElement | null)?.textContent ?? "";

describe("SplitButton", () => {
  it("names the menu trigger from menuLabel rather than a hardcoded string", () => {
    const { getByLabelText, rerender } = render(
      <SplitButton primaryLabel="New" items={ITEMS} />,
    );
    // Default is generic, not app-specific.
    expect(getByLabelText("More actions")).toBeTruthy();
    rerender(<SplitButton primaryLabel="New" items={ITEMS} menuLabel="More round types" />);
    expect(getByLabelText("More round types")).toBeTruthy();
  });

  it("fires the primary action independently of the menu", () => {
    const onPrimaryClick = vi.fn();
    const { getByText } = render(
      <SplitButton primaryLabel="New review" onPrimaryClick={onPrimaryClick} items={ITEMS} />,
    );
    fireEvent.click(getByText("New review"));
    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });

  it("opens on ArrowDown and focuses the first item", () => {
    const { getByLabelText, getByRole } = render(
      <SplitButton primaryLabel="New" items={ITEMS} menuLabel="More" />,
    );
    const trigger = getByLabelText("More");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(getByRole("menu", { name: "More" })).toBeTruthy();
    expect(activeText()).toContain("Review cycle");
  });

  it("moves between items with arrows and wraps", () => {
    const { getByLabelText } = render(<SplitButton primaryLabel="New" items={ITEMS} menuLabel="More" />);
    const trigger = getByLabelText("More");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(activeText()).toContain("Multi-category");
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(activeText()).toContain("Review cycle");
  });

  it("closes on Escape and returns focus to the trigger", () => {
    const { getByLabelText, queryByRole } = render(
      <SplitButton primaryLabel="New" items={ITEMS} menuLabel="More" />,
    );
    const trigger = getByLabelText("More");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("invokes an item handler and exposes items as menuitems", () => {
    const onClick = vi.fn();
    const { getByLabelText, getAllByRole } = render(
      <SplitButton primaryLabel="New" menuLabel="More" items={[{ label: "Review cycle", onClick }]} />,
    );
    const trigger = getByLabelText("More");
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const items = getAllByRole("menuitem");
    expect(items.length).toBe(1);
    fireEvent.click(items[0]!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables both controls together", () => {
    const { getByText, getByLabelText } = render(
      <SplitButton primaryLabel="New" items={ITEMS} menuLabel="More" disabled />,
    );
    expect((getByText("New").closest("button") as HTMLButtonElement).disabled).toBe(true);
    expect((getByLabelText("More") as HTMLButtonElement).disabled).toBe(true);
  });

  it("appends className and forwards props to the root", () => {
    const { container } = render(
      <SplitButton primaryLabel="New" className="mine" data-testid="sb" />,
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain("split-button");
    expect(el.className).toContain("mine");
    expect(el.getAttribute("data-testid")).toBe("sb");
  });
});
