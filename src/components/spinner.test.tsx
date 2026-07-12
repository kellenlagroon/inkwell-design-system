import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders with role=status and the label in an sr-only span", () => {
    const { getByRole } = render(<Spinner label="Fetching results" />);
    const el = getByRole("status");
    expect(el.getAttribute("aria-live")).toBe("polite");
    expect(el.querySelector(".sr-only")?.textContent).toBe("Fetching results");
  });

  it("hides itself from assistive tech when decorative", () => {
    const { container } = render(<Spinner decorative />);
    const el = container.querySelector(".ink-spinner")!;
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.getAttribute("role")).toBeNull();
  });

  it("applies size and tone modifiers, and skips them on defaults", () => {
    const { container, rerender } = render(<Spinner />);
    let el = container.querySelector(".ink-spinner")!;
    expect(el.className).not.toContain("ink-spinner--md");
    expect(el.className).not.toContain("ink-spinner--muted");

    rerender(<Spinner size="lg" tone="brand" />);
    el = container.querySelector(".ink-spinner")!;
    expect(el.classList.contains("ink-spinner--lg")).toBe(true);
    expect(el.classList.contains("ink-spinner--brand")).toBe(true);
  });
});
