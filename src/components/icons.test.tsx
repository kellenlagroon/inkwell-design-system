import { describe, it, expect } from "vitest";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import * as Icons from "./icons";

const entries = Object.entries(Icons).filter(
  ([name, value]) => name.startsWith("Icon") && typeof value === "function",
) as [string, (props: Record<string, unknown>) => ReactElement][];

describe("icons", () => {
  it("exports icon components", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries)("%s renders an svg that is hidden from assistive tech", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeTruthy();
    // Icons are decorative; the surrounding control supplies the name.
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it.each(entries)("%s sizes to 1em so it scales with the surrounding text", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("1em");
    expect(svg.getAttribute("height")).toBe("1em");
  });

  it("forwards className, style, and a size override", () => {
    const { container } = render(
      <Icons.IconArrowDown className="mine" size="20px" style={{ opacity: 0.5 }} />,
    );
    const svg = container.querySelector("svg")! as SVGElement;
    expect(svg.getAttribute("class")).toBe("mine");
    expect(svg.getAttribute("width")).toBe("20px");
    expect(svg.style.opacity).toBe("0.5");
    // The base style must survive being merged with a consumer style.
    expect(svg.style.flexShrink).toBe("0");
  });

  it("colours itself from currentColor rather than a hardcoded value", () => {
    const { container } = render(<Icons.IconArrowDown />);
    const stroked = container.querySelectorAll("[stroke], [fill]");
    for (const node of stroked) {
      const stroke = node.getAttribute("stroke");
      const fill = node.getAttribute("fill");
      if (stroke) expect(stroke === "currentColor" || stroke === "none").toBe(true);
      if (fill) expect(fill === "currentColor" || fill === "none").toBe(true);
    }
  });
});
