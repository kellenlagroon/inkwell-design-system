import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { IconButton } from "./iconButton";

describe("IconButton", () => {
  it("defaults to type=button so it doesn't submit a surrounding form", () => {
    const { getByLabelText } = render(<IconButton aria-label="Close" icon={<svg />} />);
    expect(getByLabelText("Close").getAttribute("type")).toBe("button");
  });

  it("adds no modifier at the default size and --sm for small", () => {
    const { getByLabelText, rerender } = render(<IconButton aria-label="a" />);
    expect(getByLabelText("a").className).toBe("icon-btn");
    rerender(<IconButton aria-label="a" size="sm" />);
    expect(getByLabelText("a").className).toContain("icon-btn--sm");
  });

  it("appends className and forwards button props", () => {
    const onClick = vi.fn();
    const { getByLabelText } = render(
      <IconButton aria-label="a" className="mine" onClick={onClick} disabled />,
    );
    const btn = getByLabelText("a") as HTMLButtonElement;
    expect(btn.className).toContain("icon-btn");
    expect(btn.className).toContain("mine");
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
