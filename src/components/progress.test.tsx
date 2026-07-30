import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress (determinate)", () => {
  it("wires aria-valuenow and sets a rounded wavy SVG ring arc", () => {
    const { getByRole, container } = render(<Progress value={42} ariaLabel="Uploading" />);
    const bar = getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("42");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("aria-label")).toBe("Uploading");
    const fill = container.querySelector<SVGPathElement>(".ink-progress-fill")!;
    expect(container.querySelector(".ink-progress-svg")).toBeTruthy();
    expect(fill.tagName).toBe("path");
    expect(fill.getAttribute("stroke")).toBeNull();
    expect(fill.style.strokeDasharray).toBe("42 58");
    expect(fill.classList.contains("ink-progress-fill--indeterminate")).toBe(false);
  });

  it("clamps out-of-range values into 0–100", () => {
    const { getByRole, container, rerender } = render(<Progress value={-25} ariaLabel="x" />);
    expect(getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
    expect(container.querySelector(".ink-progress-fill")).toBeNull();
    rerender(<Progress value={250} ariaLabel="x" />);
    expect(getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
  });

  it("labels itself via aria-labelledby when `label` is set", () => {
    const { getByRole, getByText } = render(<Progress value={40} label="Uploading" />);
    const bar = getByRole("progressbar");
    const labelId = bar.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();
    expect(getByText("Uploading").id).toBe(labelId);
    // no fallback aria-label when labelledby is present
    expect(bar.getAttribute("aria-label")).toBeNull();
  });

  it("shows a formatted value beside the label", () => {
    const { getByText } = render(<Progress value={40} label="Uploading" />);
    expect(getByText("40%")).toBeTruthy();
  });

  it("renders a wavy SVG path by default", () => {
    const { container } = render(<Progress value={60} ariaLabel="Uploading" />);
    const fill = container.querySelector<SVGPathElement>(".ink-progress-fill.ink-progress-wavy-path")!;
    expect(fill.tagName).toBe("path");
    expect(fill.getAttribute("d")).toMatch(/^M/);
    expect(fill.getAttribute("stroke")).toBeNull();
    expect(fill.querySelector(".ink-progress-wavy-path-motion")?.getAttribute("attributeName")).toBe("d");
    expect(fill.style.strokeDasharray).toBe("60 40");
  });
});

describe("Progress (indeterminate)", () => {
  it("exposes aria-valuetext and marks the fill as indeterminate when value is omitted", () => {
    const { getByRole, container } = render(<Progress ariaLabel="Syncing" />);
    const bar = getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBeNull();
    expect(bar.getAttribute("aria-valuetext")).toBe("indeterminate");
    const fill = container.querySelector(".ink-progress-fill")!;
    expect(fill.classList.contains("ink-progress-fill--indeterminate")).toBe(true);
    expect(fill.classList.contains("ink-progress-wavy-path")).toBe(false);
    expect(fill.querySelector(".ink-progress-wavy-path-motion")).toBeNull();
    expect(container.querySelector(".ink-progress-track")?.classList.contains("ink-progress-wavy-path")).toBe(false);
  });
});
