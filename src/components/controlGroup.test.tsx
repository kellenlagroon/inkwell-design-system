import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ControlGroup } from "./controlGroup";

describe("ControlGroup", () => {
  it("renders start and end slots", () => {
    render(<ControlGroup start="Filters" end={<button type="button">Reset</button>} />);
    expect(screen.getByText("Filters")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Reset" })).toBeTruthy();
  });

  it("exposes the requested responsive stacking breakpoint", () => {
    const { container } = render(<ControlGroup stackBelow="lg" start="Filters" />);
    expect(container.firstElementChild?.className).toContain("ink-control-group--stack-lg");
  });
});
