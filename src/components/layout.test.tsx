import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Stack, Inline, Grid } from "./layout";

const rootOf = (markup: ReturnType<typeof render>) => markup.container.firstChild as HTMLElement;
const cssVar = (el: HTMLElement, name: string) => el.style.getPropertyValue(name).trim();

describe("Stack", () => {
  it("defaults to the md (12px) rhythm and stretch, with no align override", () => {
    const el = rootOf(render(<Stack>x</Stack>));
    expect(el.className).toBe("ink-stack");
    expect(cssVar(el, "--ink-stack-gap")).toBe("var(--space-3)");
    expect(cssVar(el, "--ink-stack-align")).toBe("");
  });

  it("maps gap and align to CSS variables", () => {
    const el = rootOf(render(<Stack gap="sm" align="center">x</Stack>));
    expect(cssVar(el, "--ink-stack-gap")).toBe("var(--space-2)");
    expect(cssVar(el, "--ink-stack-align")).toBe("center");
  });

  it("supports gap none and appends className", () => {
    const el = rootOf(render(<Stack gap="none" className="mt">x</Stack>));
    expect(cssVar(el, "--ink-stack-gap")).toBe("0");
    expect(el.className).toBe("ink-stack mt");
  });
});

describe("Inline", () => {
  it("defaults to md gap, centered, wrapping", () => {
    const el = rootOf(render(<Inline>x</Inline>));
    expect(el.className).toBe("ink-inline");
    expect(cssVar(el, "--ink-inline-gap")).toBe("var(--space-3)");
    expect(cssVar(el, "--ink-inline-wrap")).toBe("wrap");
  });

  it("maps justify/align and disables wrap", () => {
    const el = rootOf(render(<Inline justify="between" align="start" wrap={false}>x</Inline>));
    expect(cssVar(el, "--ink-inline-justify")).toBe("space-between");
    expect(cssVar(el, "--ink-inline-align")).toBe("flex-start");
    expect(cssVar(el, "--ink-inline-wrap")).toBe("nowrap");
  });
});

describe("Grid", () => {
  it("defaults to 2 equal columns with the md rhythm", () => {
    const el = rootOf(render(<Grid>x</Grid>));
    expect(el.className).toBe("ink-grid");
    expect(cssVar(el, "--ink-grid-columns")).toBe("repeat(2, minmax(0, 1fr))");
    expect(cssVar(el, "--ink-grid-gap")).toBe("var(--space-3)");
  });

  it("maps columns and gap", () => {
    const el = rootOf(render(<Grid columns={3} gap="lg">x</Grid>));
    expect(cssVar(el, "--ink-grid-columns")).toBe("repeat(3, minmax(0, 1fr))");
    expect(cssVar(el, "--ink-grid-gap")).toBe("var(--space-4)");
  });

  it("passes through native props", () => {
    const el = rootOf(render(<Grid data-testid="g" role="list">x</Grid>));
    expect(el.getAttribute("data-testid")).toBe("g");
    expect(el.getAttribute("role")).toBe("list");
  });
});
