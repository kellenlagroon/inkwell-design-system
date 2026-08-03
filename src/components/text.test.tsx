import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Text, Heading, Link } from "./text";

describe("Text", () => {
  it("wraps normally by default, and opts into mid-word breaking on request", () => {
    const { container, rerender } = render(<Text>hello</Text>);
    expect(container.querySelector(".ink-text")!.className).not.toContain("ink-wrap-anywhere");
    rerender(<Text wrap="anywhere">hello</Text>);
    expect(container.querySelector(".ink-text")!.className).toContain("ink-wrap-anywhere");
  });

  it("renders the requested element and appends className", () => {
    const { container } = render(<Text as="span" tone="muted" size="sm" className="mine">x</Text>);
    const el = container.firstElementChild!;
    expect(el.tagName).toBe("SPAN");
    expect(el.className).toContain("ink-text--muted");
    expect(el.className).toContain("ink-text--sm");
    expect(el.className).toContain("mine");
  });
});

describe("Heading", () => {
  it("decouples heading level from visual size", () => {
    const { container } = render(<Heading level={4} size="xl">Title</Heading>);
    const el = container.firstElementChild!;
    expect(el.tagName).toBe("H4");
    expect(el.className).toContain("ink-heading--xl");
  });
});

describe("Link", () => {
  it("adds noopener/noreferrer to external links", () => {
    const { container } = render(<Link href="https://example.com" external>x</Link>);
    const a = container.querySelector("a")!;
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toContain("noopener");
    expect(a.getAttribute("rel")).toContain("noreferrer");
  });

  it("leaves internal links untouched", () => {
    const { container } = render(<Link href="/about">x</Link>);
    const a = container.querySelector("a")!;
    expect(a.getAttribute("target")).toBeNull();
    expect(a.getAttribute("rel")).toBeNull();
  });
});
