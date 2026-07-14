import { describe, it, expect } from "vitest";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Nav, type NavItem } from "./nav";

const ITEMS: NavItem[] = [
  { value: "ballot", label: "Ballot" },
  { value: "results", label: "Results", badge: 3 },
  { value: "commissioner", label: "Commissioner" },
];

function Harness({ initial = "ballot", orientation }: { initial?: string; orientation?: "horizontal" | "vertical" }) {
  const [value, setValue] = useState(initial);
  return <Nav items={ITEMS} value={value} onChange={setValue} orientation={orientation} aria-label="Primary" />;
}

describe("Nav", () => {
  it("renders a <nav> with the accessible name and one aria-current item", () => {
    const { getByRole, getAllByRole } = render(<Harness />);
    expect(getByRole("navigation").getAttribute("aria-label")).toBe("Primary");
    const buttons = getAllByRole("button");
    expect(buttons.filter((b) => b.getAttribute("aria-current") === "page")).toHaveLength(1);
    expect(buttons[0]!.getAttribute("aria-current")).toBe("page");
  });

  it("activates an item on click", () => {
    const { getByRole } = render(<Harness />);
    fireEvent.click(getByRole("button", { name: /results/i }));
    expect(getByRole("button", { name: /results/i }).getAttribute("aria-current")).toBe("page");
  });

  it("renders the badge when provided", () => {
    const { getByText } = render(<Harness />);
    expect(getByText("3").className).toContain("ink-nav-badge");
  });

  it("renders a dot with no content when badge is true", () => {
    function DotHarness() {
      const [value, setValue] = useState("a");
      const items: NavItem[] = [
        { value: "a", label: "Alerts", badge: true },
        { value: "b", label: "Other" },
      ];
      return <Nav items={items} value={value} onChange={setValue} aria-label="Primary" />;
    }
    const { container } = render(<DotHarness />);
    const dot = container.querySelector(".ink-nav-badge--dot");
    expect(dot).not.toBeNull();
    expect(dot!.textContent).toBe("");
    expect(dot!.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders an <a> for href items with aria-current on the active one", () => {
    function LinkHarness() {
      const [value, setValue] = useState("results");
      const items: NavItem[] = [
        { value: "ballot", label: "Ballot", href: "#ballot" },
        { value: "results", label: "Results", href: "#results" },
      ];
      return <Nav items={items} value={value} onChange={setValue} aria-label="Primary" />;
    }
    const { getByRole } = render(<LinkHarness />);
    const active = getByRole("link", { name: "Results" });
    expect(active.tagName).toBe("A");
    expect(active.getAttribute("href")).toBe("#results");
    expect(active.getAttribute("aria-current")).toBe("page");
    expect(getByRole("link", { name: "Ballot" }).getAttribute("aria-current")).toBeNull();
  });

  it("applies the orientation modifier class", () => {
    const { getByRole } = render(<Harness orientation="vertical" />);
    expect(getByRole("navigation").className).toContain("ink-nav--vertical");
  });

  it("only opts into mobile docking when requested", () => {
    const { getByRole, rerender } = render(<Harness />);
    expect(getByRole("navigation").className).not.toContain("ink-nav--mobile-docked");

    rerender(
      <Nav
        items={ITEMS}
        value="ballot"
        onChange={() => {}}
        mobileDocked
        aria-label="Primary"
      />,
    );
    expect(getByRole("navigation").className).toContain("ink-nav--mobile-docked");
  });
});
