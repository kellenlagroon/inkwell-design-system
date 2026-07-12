import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a single text skeleton by default, marked decorative", () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector(".ink-skeleton")!;
    expect(el.classList.contains("ink-skeleton--text")).toBe(true);
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("stacks multiple text lines and shortens the last one", () => {
    const { container } = render(<Skeleton lines={3} />);
    const wrap = container.querySelector(".ink-skeleton-lines")!;
    const lines = wrap.querySelectorAll<HTMLElement>(".ink-skeleton");
    expect(lines.length).toBe(3);
    // last line uses a shorter width to read like natural paragraph flow
    expect(lines[2]!.style.width).toBe("68%");
    expect(wrap.getAttribute("aria-hidden")).toBe("true");
  });

  it("sizes a circle by width/height (from `size` shorthand)", () => {
    const { container } = render(<Skeleton variant="circle" size={48} />);
    const el = container.querySelector<HTMLElement>(".ink-skeleton")!;
    expect(el.style.width).toBe("48px");
    expect(el.style.height).toBe("48px");
    expect(el.classList.contains("ink-skeleton--circle")).toBe(true);
  });
});
