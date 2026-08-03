import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Container, Center, Surface, Paper } from "./surface";

const root = (r: ReturnType<typeof render>) => r.container.firstElementChild!;

describe("Container", () => {
  it("applies the size modifier and padded default", () => {
    const el = root(render(<Container>x</Container>));
    expect(el.className).toContain("ink-container");
    expect(el.className).toContain("ink-container--lg");
    expect(el.className).toContain("ink-container--padded");
  });

  it("lets padding override padded", () => {
    const el = root(render(<Container padding="sm">x</Container>));
    expect(el.className).toContain("ink-padding--sm");
    expect(el.className).not.toContain("ink-container--padded");
  });

  it("drops padding entirely with padded={false}", () => {
    const el = root(render(<Container padded={false}>x</Container>));
    expect(el.className).not.toContain("padded");
  });
});

describe("Center", () => {
  it("exposes minHeight as a scoped custom property", () => {
    const el = root(render(<Center minHeight="50vh">x</Center>)) as HTMLElement;
    expect(el.style.getPropertyValue("--ink-center-min-height")).toBe("50vh");
  });

  it("wraps children in a container only when maxWidth is set", () => {
    const without = root(render(<Center>x</Center>));
    expect(without.querySelector(".ink-container")).toBeNull();
    const withMax = root(render(<Center maxWidth="sm">x</Center>));
    expect(withMax.querySelector(".ink-container--sm")).toBeTruthy();
  });
});

describe("Surface", () => {
  it("adds no modifier for the default tone", () => {
    const el = root(render(<Surface>x</Surface>));
    expect(el.className).toContain("ink-surface");
    expect(el.className).not.toContain("ink-surface--default");
  });

  it("applies tone and forwards props", () => {
    const el = root(render(<Surface tone="raised" className="mine" data-testid="s">x</Surface>));
    expect(el.className).toContain("ink-surface--raised");
    expect(el.className).toContain("mine");
    expect(el.getAttribute("data-testid")).toBe("s");
  });
});

describe("Paper", () => {
  it("is an alias of Surface", () => {
    expect(Paper).toBe(Surface);
  });
});
