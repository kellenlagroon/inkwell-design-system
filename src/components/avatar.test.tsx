import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("derives up to two uppercase initials from the name and labels itself", () => {
    const { container } = render(<Avatar name="kellen lagroon" />);
    const el = container.querySelector(".ink-avatar")!;
    expect(el.textContent).toBe("KL");
    expect(el.getAttribute("role")).toBe("img");
    expect(el.getAttribute("aria-label")).toBe("kellen lagroon");
    // initials live in their own span so we can optically center them
    expect(container.querySelector(".ink-avatar-initials")?.textContent).toBe("KL");
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

  it("wraps in a button when interactive, moving the accessible label to the button", () => {
    const onClick = vi.fn();
    const { getByRole, container } = render(
      <Avatar name="Kellen Lagroon" interactive onClick={onClick} />,
    );
    const button = getByRole("button", { name: "Kellen Lagroon" });
    expect(button.classList.contains("ink-avatar-button")).toBe(true);
    // the inner avatar is aria-hidden (button carries the name)
    expect(container.querySelector(".ink-avatar")!.getAttribute("aria-label")).toBeNull();
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
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
