import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { ExpandableContent } from "./expandableContent";

const originalHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollHeight");

afterEach(() => {
  if (originalHeight) Object.defineProperty(HTMLElement.prototype, "scrollHeight", originalHeight);
  else delete (HTMLElement.prototype as { scrollHeight?: number }).scrollHeight;
  vi.restoreAllMocks();
});

function contentHeight(height: number) {
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", { configurable: true, get: () => height });
}

describe("ExpandableContent", () => {
  it("leaves short content fully visible without a disclosure", () => {
    contentHeight(80);
    const { queryByRole, container } = render(<ExpandableContent><p>Short copy</p></ExpandableContent>);
    expect(queryByRole("button", { name: "Show more" })).toBeNull();
    expect(container.querySelector(".ink-expandable-content__region--clipped")).toBeNull();
  });

  it("measures long content and wires a controlled disclosure", () => {
    contentHeight(220);
    const onExpandedChange = vi.fn();
    const { getByRole, container, rerender } = render(
      <ExpandableContent expanded={false} onExpandedChange={onExpandedChange}><p>Long copy</p></ExpandableContent>,
    );
    const trigger = getByRole("button", { name: "Show more" });
    expect(trigger.getAttribute("aria-controls")).toBe(container.querySelector(".ink-expandable-content__region")?.id);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(trigger);
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    rerender(<ExpandableContent expanded onExpandedChange={onExpandedChange}><p>Long copy</p></ExpandableContent>);
    expect(getByRole("button", { name: "Show less" }).getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector(".ink-expandable-content__region--clipped")).toBeNull();
  });

  it("keeps a fully clipped link out of the keyboard sequence and restores it", () => {
    contentHeight(220);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      const top = this.tagName === "A" ? 150 : 0;
      return { top, bottom: top + 20, left: 0, right: 100, width: 100, height: 20, x: 0, y: top, toJSON: () => ({}) };
    });
    const { getByRole, container } = render(
      <ExpandableContent><p>Excerpt</p><a href="#more">Clipped link</a></ExpandableContent>,
    );
    const link = container.querySelector("a")!;
    expect(link.getAttribute("tabindex")).toBe("-1");
    expect(link.getAttribute("aria-hidden")).toBe("true");
    fireEvent.click(getByRole("button", { name: "Show more" }));
    expect(link.hasAttribute("tabindex")).toBe(false);
    expect(link.hasAttribute("aria-hidden")).toBe(false);
  });

  it("reacts to content changes that cross the threshold", () => {
    contentHeight(80);
    const { queryByRole, rerender } = render(<ExpandableContent>Short</ExpandableContent>);
    expect(queryByRole("button")).toBeNull();
    contentHeight(220);
    rerender(<ExpandableContent>Long content</ExpandableContent>);
    expect(queryByRole("button", { name: "Show more" })).not.toBeNull();
  });
});
