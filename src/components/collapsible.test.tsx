import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Collapsible } from "./collapsible";

describe("Collapsible (uncontrolled)", () => {
  it("starts closed, wires aria, and toggles open on click", () => {
    const { getByRole, container } = render(
      <Collapsible title="Best offense" meta="12 submissions">
        <p>Panel body</p>
      </Collapsible>,
    );
    const trigger = getByRole("button");
    const content = container.querySelector(".collapsible-content")!;
    const chevron = container.querySelector(".collapsible-chevron")!;

    // closed
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(content.hasAttribute("hidden")).toBe(true);
    expect(chevron.getAttribute("class")).not.toContain("collapsible-chevron--open");
    // aria wiring resolves both ways
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    expect(content.getAttribute("aria-labelledby")).toBe(trigger.id);

    // open
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.hasAttribute("hidden")).toBe(false);
    expect(chevron.getAttribute("class")).toContain("collapsible-chevron--open");
  });

  it("honors defaultOpen", () => {
    const { container } = render(
      <Collapsible title="Open by default" defaultOpen>
        <p>x</p>
      </Collapsible>,
    );
    expect(container.querySelector(".collapsible-content")!.hasAttribute("hidden")).toBe(false);
  });
});

describe("Collapsible (controlled)", () => {
  it("reflects the open prop and reports changes without self-toggling", () => {
    const onOpenChange = vi.fn();
    const { getByRole, container, rerender } = render(
      <Collapsible title="Controlled" open={false} onOpenChange={onOpenChange}>
        <p>x</p>
      </Collapsible>,
    );
    const trigger = getByRole("button");
    fireEvent.click(trigger);
    // controlled: state doesn't change until parent updates the prop
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    rerender(
      <Collapsible title="Controlled" open onOpenChange={onOpenChange}>
        <p>x</p>
      </Collapsible>,
    );
    expect(container.querySelector(".collapsible-content")!.hasAttribute("hidden")).toBe(false);
  });
});
