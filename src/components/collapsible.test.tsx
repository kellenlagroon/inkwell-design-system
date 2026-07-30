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

  it("makes the whole header the toggle, with the chevron contained in a box", () => {
    const { getByRole, container } = render(
      <Collapsible title="Best offense" meta="12 submissions">x</Collapsible>,
    );
    // the single button is the full-width header, and it names itself via the title
    const trigger = getByRole("button", { name: /Best offense/ });
    expect(trigger.classList.contains("collapsible-trigger")).toBe(true);
    // the chevron lives in a decorative box that carries the hover fill
    const box = container.querySelector(".collapsible-chevron-box")!;
    expect(box.getAttribute("aria-hidden")).toBe("true");
    expect(box.querySelector(".collapsible-chevron")).not.toBeNull();
  });

  it("adds the divided modifier only when requested", () => {
    const { container, rerender } = render(<Collapsible title="Plain">x</Collapsible>);
    expect(container.querySelector(".collapsible")!.classList.contains("collapsible--divided")).toBe(false);

    rerender(<Collapsible title="Divided" divided>x</Collapsible>);
    expect(container.querySelector(".collapsible")!.classList.contains("collapsible--divided")).toBe(true);
  });

  it("accepts scoped visual customization variables", () => {
    const { container } = render(
      <Collapsible title="Custom" style={{ "--ink-collapsible-chevron-size": "28px" }}>x</Collapsible>,
    );
    expect((container.querySelector(".collapsible") as HTMLElement).style.getPropertyValue("--ink-collapsible-chevron-size")).toBe("28px");
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
