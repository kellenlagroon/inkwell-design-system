import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Sidebar } from "./sidebar";
import { Nav } from "./nav";

describe("Sidebar", () => {
  it("renders an <aside> with the sticky class by default", () => {
    const { container } = render(<Sidebar>content</Sidebar>);
    const aside = container.querySelector("aside")!;
    expect(aside.className).toContain("ink-sidebar");
    expect(aside.className).toContain("ink-sidebar--sticky");
    expect(aside.className).toContain("ink-sidebar--md");
    expect(aside.className).toContain("ink-sidebar--start");
  });

  it("applies fixed modifier when fixed is set", () => {
    const { container } = render(<Sidebar fixed>x</Sidebar>);
    const aside = container.querySelector("aside")!;
    expect(aside.className).toContain("ink-sidebar--fixed");
    expect(aside.className).not.toContain("ink-sidebar--sticky");
  });

  it("renders header and footer when provided, always renders main", () => {
    const { container } = render(
      <Sidebar header={<span data-h>hdr</span>} footer={<span data-f>ftr</span>}>
        <span data-m>main</span>
      </Sidebar>,
    );
    expect(container.querySelector(".ink-sidebar-header [data-h]")).not.toBeNull();
    expect(container.querySelector(".ink-sidebar-main [data-m]")).not.toBeNull();
    expect(container.querySelector(".ink-sidebar-footer [data-f]")).not.toBeNull();
  });

  it("omits header/footer wrappers when the slots are empty", () => {
    const { container } = render(<Sidebar>x</Sidebar>);
    expect(container.querySelector(".ink-sidebar-header")).toBeNull();
    expect(container.querySelector(".ink-sidebar-footer")).toBeNull();
  });

  it("switches to end side when requested", () => {
    const { container } = render(<Sidebar side="end">x</Sidebar>);
    expect(container.querySelector("aside")!.className).toContain("ink-sidebar--end");
  });

  it("defaults nested Nav to variant=list via context", () => {
    const { container } = render(
      <Sidebar>
        <Nav
          orientation="vertical"
          items={[{ value: "a", label: "A" }, { value: "b", label: "B" }]}
          value="a"
          onChange={() => {}}
          aria-label="Primary"
        />
      </Sidebar>,
    );
    expect(container.querySelector("nav.ink-nav")!.className).toContain("ink-nav--list");
  });

  it("respects an explicit variant on nested Nav", () => {
    const { container } = render(
      <Sidebar>
        <Nav
          orientation="vertical"
          variant="chip"
          items={[{ value: "a", label: "A" }, { value: "b", label: "B" }]}
          value="a"
          onChange={() => {}}
          aria-label="Primary"
        />
      </Sidebar>,
    );
    expect(container.querySelector("nav.ink-nav")!.className).toContain("ink-nav--chip");
    expect(container.querySelector("nav.ink-nav")!.className).not.toContain("ink-nav--list");
  });
});
