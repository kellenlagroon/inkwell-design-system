import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "./badge";

const rootOf = (markup: ReturnType<typeof render>) => markup.container.firstChild as HTMLElement;

describe("Badge", () => {
  it("defaults to the neutral tone and shows its content", () => {
    const el = rootOf(render(<Badge>3</Badge>));
    expect(el.className).toBe("badge");
    expect(el.textContent).toBe("3");
  });

  it("applies semantic tones", () => {
    expect(rootOf(render(<Badge tone="neutral">9</Badge>)).className).toBe("badge");
    expect(rootOf(render(<Badge tone="brand">9</Badge>)).className).toBe("badge badge--brand");
    expect(rootOf(render(<Badge tone="success">9</Badge>)).className).toBe("badge badge--success");
    expect(rootOf(render(<Badge tone="warning">9</Badge>)).className).toBe("badge badge--warning");
    expect(rootOf(render(<Badge tone="danger">9</Badge>)).className).toBe("badge badge--danger");
  });

  it("renders a bare dot with no content", () => {
    const el = rootOf(render(<Badge dot aria-label="New activity">99</Badge>));
    expect(el.className).toBe("badge badge--dot");
    expect(el.textContent).toBe("");
    expect(el.getAttribute("aria-label")).toBe("New activity");
  });

  it("composes dot with a tone and appends className", () => {
    const el = rootOf(render(<Badge dot tone="danger" className="pos" />));
    expect(el.className).toBe("badge badge--dot badge--danger pos");
  });
});
