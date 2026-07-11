import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("renders a default info trigger wired to the tooltip content", () => {
    const { getByRole, container } = render(<Tooltip content="Anonymized before publishing." />);
    const trigger = getByRole("button");
    const tip = getByRole("tooltip");

    // default trigger has an accessible name and describes itself with the tooltip
    expect(trigger.getAttribute("aria-label")).toBe("More information");
    expect(trigger.getAttribute("aria-describedby")).toBe(tip.id);
    expect(tip.textContent).toContain("Anonymized before publishing.");
    // the tooltip content is present in the DOM (CSS handles reveal)
    expect(container.querySelector(".info-tooltip-content")).toBe(tip);
  });

  it("lets a custom trigger keep its role and receive aria-describedby", () => {
    const { getByRole } = render(
      <Tooltip content="Why anonymized?" trigger={<button type="button">Details</button>} />,
    );
    const trigger = getByRole("button", { name: "Details" });
    expect(trigger.getAttribute("aria-describedby")).toBe(getByRole("tooltip").id);
  });

  it("dismisses on Escape and re-arms on mouse leave", () => {
    const { container } = render(<Tooltip content="Hidden on escape." />);
    const wrap = container.querySelector(".info-tooltip")!;

    expect(wrap.hasAttribute("data-tooltip-dismissed")).toBe(false);
    fireEvent.keyDown(wrap, { key: "Escape" });
    expect(wrap.hasAttribute("data-tooltip-dismissed")).toBe(true);
    fireEvent.mouseLeave(wrap);
    expect(wrap.hasAttribute("data-tooltip-dismissed")).toBe(false);
  });
});
