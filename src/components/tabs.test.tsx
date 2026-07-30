import { afterEach, describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Tabs, type TabItem } from "./tabs";

const TABS: TabItem[] = [
  { value: "poll", label: "Poll" },
  { value: "multi", label: "Multi" },
  { value: "sel", label: "Selection", disabled: true },
  { value: "results", label: "Results" },
];

function Harness({ initial = "poll" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  return <Tabs tabs={TABS} value={value} onChange={setValue} aria-label="Views" id="v" />;
}

const activeText = () => (document.activeElement as HTMLElement | null)?.textContent;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Tabs", () => {
  it("renders a tablist with the selected tab and roving tabindex", () => {
    const { getByRole, getAllByRole } = render(<Harness />);
    expect(getByRole("tablist").getAttribute("aria-label")).toBe("Views");
    const [first, second] = getAllByRole("tab");
    expect(first!.getAttribute("aria-selected")).toBe("true");
    expect(first!.getAttribute("tabindex")).toBe("0");
    expect(second!.getAttribute("tabindex")).toBe("-1");
    expect(first!.getAttribute("aria-controls")).toBe("v-panel-poll");
  });

  it("selects on click", () => {
    const { getByRole } = render(<Harness />);
    fireEvent.click(getByRole("tab", { name: "Multi" }));
    expect(getByRole("tab", { name: "Multi" }).getAttribute("aria-selected")).toBe("true");
  });

  it("ArrowRight moves and activates, skipping disabled tabs and wrapping", () => {
    const { getByRole } = render(<Harness />);
    const list = getByRole("tablist");
    fireEvent.keyDown(list, { key: "ArrowRight" }); // poll -> multi
    expect(activeText()).toBe("Multi");
    fireEvent.keyDown(list, { key: "ArrowRight" }); // skip disabled Selection -> Results
    expect(activeText()).toBe("Results");
    fireEvent.keyDown(list, { key: "ArrowRight" }); // wrap -> Poll
    expect(activeText()).toBe("Poll");
  });

  it("Home and End jump to the first and last enabled tabs", () => {
    const { getByRole } = render(<Harness initial="multi" />);
    const list = getByRole("tablist");
    fireEvent.keyDown(list, { key: "End" });
    expect(activeText()).toBe("Results");
    fireEvent.keyDown(list, { key: "Home" });
    expect(activeText()).toBe("Poll");
  });

  it("scrolls the selected tab into view for overflowing tablists", () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    const { getByRole } = render(<Harness />);
    scrollIntoView.mockClear();
    fireEvent.click(getByRole("tab", { name: "Results" }));

    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest", inline: "nearest" });
  });

  it("accepts a consumer class and scoped visual customization variables", () => {
    const { getByRole } = render(
      <Tabs
        tabs={TABS}
        value="poll"
        onChange={() => {}}
        aria-label="Views"
        className="custom-tabs"
        style={{ "--ink-tabs-indicator-color": "rebeccapurple" }}
      />,
    );
    const tablist = getByRole("tablist");
    expect(tablist.className).toContain("custom-tabs");
    expect(tablist.style.getPropertyValue("--ink-tabs-indicator-color")).toBe("rebeccapurple");
  });
});
