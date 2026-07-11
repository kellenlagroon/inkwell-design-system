import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("derives up to two uppercase initials from the name and labels itself", () => {
    const { container } = render(<Avatar name="kellen lagroon" />);
    const el = container.querySelector(".ink-avatar")!;
    expect(el.textContent).toBe("KL");
    expect(el.getAttribute("role")).toBe("img");
    expect(el.getAttribute("aria-label")).toBe("kellen lagroon");
  });

  it("renders an image with alt from name when src is set", () => {
    const { container } = render(<Avatar name="Kellen Lagroon" src="x.png" />);
    const img = container.querySelector("img.ink-avatar-image")!;
    expect(img.getAttribute("alt")).toBe("Kellen Lagroon");
    // the wrapper doesn't double up a role when the image carries the label
    expect(container.querySelector(".ink-avatar")!.getAttribute("role")).toBeNull();
  });

  it("hides itself when decorative", () => {
    const { container } = render(<Avatar name="Kellen Lagroon" decorative />);
    const el = container.querySelector(".ink-avatar")!;
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.getAttribute("role")).toBeNull();
  });

  it("applies size and shape modifiers", () => {
    const { container } = render(<Avatar name="KL" size="lg" shape="square" />);
    const el = container.querySelector(".ink-avatar")!;
    expect(el.classList.contains("ink-avatar--lg")).toBe(true);
    expect(el.classList.contains("ink-avatar--square")).toBe(true);
    // md is the default and adds no size modifier
    expect(el.className).not.toContain("ink-avatar--md");
  });
});
