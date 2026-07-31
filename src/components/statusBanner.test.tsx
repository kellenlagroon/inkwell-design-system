import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { StatusBanner } from "./statusBanner";

describe("StatusBanner", () => {
  it("renders nothing without a message", () => {
    const { container } = render(<StatusBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("announces politely by default so an appearing message is read out", () => {
    const { getByRole } = render(<StatusBanner message="Changes saved." />);
    const banner = getByRole("status");
    expect(banner.getAttribute("aria-live")).toBe("polite");
    expect(banner.textContent).toContain("Changes saved.");
  });

  it.each(["danger", "error", "warning"] as const)("interrupts for the %s tone", (tone) => {
    const { getByRole } = render(<StatusBanner message="Save failed." tone={tone} />);
    expect(getByRole("alert").getAttribute("aria-live")).toBe("assertive");
  });

  it("can opt out of announcements for a banner that is static on mount", () => {
    const { container, queryByRole } = render(<StatusBanner message="FYI" live="off" />);
    expect(queryByRole("status")).toBeNull();
    expect((container.firstChild as HTMLElement).hasAttribute("aria-live")).toBe(false);
  });

  it("maps the error tone alias onto danger styling", () => {
    const { getByRole } = render(<StatusBanner message="x" tone="error" />);
    expect(getByRole("alert").className).toContain("status-banner--danger");
  });

  it("appends className and forwards props", () => {
    const { getByRole } = render(<StatusBanner message="x" className="mine" data-testid="b" />);
    const banner = getByRole("status");
    expect(banner.className).toContain("status-banner");
    expect(banner.className).toContain("mine");
    expect(banner.getAttribute("data-testid")).toBe("b");
  });

  it("renders a dismiss control only when onDismiss is given", () => {
    const onDismiss = vi.fn();
    const { queryByLabelText, rerender, getByLabelText } = render(<StatusBanner message="x" />);
    expect(queryByLabelText("Dismiss")).toBeNull();
    rerender(<StatusBanner message="x" onDismiss={onDismiss} dismissLabel="Close alert" />);
    fireEvent.click(getByLabelText("Close alert"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
