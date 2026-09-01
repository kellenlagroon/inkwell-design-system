import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RichTextSafe } from "./richTextSafe";

describe("RichTextSafe", () => {
  it("renders children inside the rich-text container", () => {
    const { container } = render(<RichTextSafe><p>Body</p></RichTextSafe>);
    const el = container.firstElementChild!;
    expect(el.className).toContain("ink-rich-text");
    expect(el.querySelector("p")!.textContent).toBe("Body");
  });

  it("adds the collapsed modifier only when asked", () => {
    const { container, rerender } = render(<RichTextSafe>x</RichTextSafe>);
    expect(container.firstElementChild!.className).not.toContain("collapsed");
    rerender(<RichTextSafe collapsed>x</RichTextSafe>);
    expect(container.firstElementChild!.className).toContain("ink-rich-text--collapsed");
  });

  it("appends className and forwards props", () => {
    const { container } = render(<RichTextSafe className="mine" data-testid="r">x</RichTextSafe>);
    const el = container.firstElementChild!;
    expect(el.className).toContain("ink-rich-text");
    expect(el.className).toContain("mine");
    expect(el.getAttribute("data-testid")).toBe("r");
  });

  it("does not sanitize — it is a styling container only", () => {
    // Sanitization is explicitly the consumer's job; this guards that the
    // component never silently strips markup and create a false sense of safety.
    const { container } = render(
      <RichTextSafe><span data-x="1">kept</span></RichTextSafe>,
    );
    expect(container.querySelector("span[data-x='1']")!.textContent).toBe("kept");
  });

  it("keeps browser-parseable nested blocks inside the rich-text boundary", () => {
    const { container } = render(
      <RichTextSafe dangerouslySetInnerHTML={{ __html: "<h2>Role</h2><ul><li><p>Item <strong>strong</strong> <a href='#x'>link</a></p></li></ul><blockquote><p>Quote</p></blockquote>" }} />,
    );
    const root = container.firstElementChild!;
    expect(root.querySelector("h2")?.textContent).toBe("Role");
    expect(root.querySelector("ul li p")?.textContent).toContain("Item");
    expect(root.querySelector("blockquote p")).not.toBeNull();
    expect(root.querySelector("strong")).not.toBeNull();
    expect(root.querySelector("a")?.getAttribute("href")).toBe("#x");
  });
});
