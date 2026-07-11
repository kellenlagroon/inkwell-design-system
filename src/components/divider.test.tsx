import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "./divider";

describe("Divider", () => {
  it("renders a horizontal hr separator by default", () => {
    const { container } = render(<Divider />);
    const el = container.querySelector(".ink-divider")!;
    expect(el.tagName).toBe("HR");
    // <hr> has an implicit separator role and horizontal orientation
    expect(el.getAttribute("aria-orientation")).toBeNull();
    expect(el.classList.contains("ink-divider--vertical")).toBe(false);
  });

  it("marks a vertical divider with role and aria-orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.querySelector(".ink-divider")!;
    expect(el.tagName).not.toBe("HR");
    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("renders a labeled separator with the label text", () => {
    const { container, getByText } = render(<Divider label="or" />);
    const el = container.querySelector(".ink-divider")!;
    expect(el.getAttribute("role")).toBe("separator");
    expect(el.classList.contains("ink-divider--labeled")).toBe(true);
    expect(getByText("or").classList.contains("ink-divider-label")).toBe(true);
  });
});
