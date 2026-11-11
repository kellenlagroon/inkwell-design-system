import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Drawer } from "./drawer";
import { Popover } from "./popover";
import { Select } from "./select";

describe("Drawer", () => {
  it("lets Escape dismiss an open Select inside a Popover before either containing layer", () => {
    const onClose = vi.fn();
    const { getByRole, queryByRole } = render(
      <Drawer open onClose={onClose} title="Edit record">
        <Popover ariaLabel="Options" dialog trigger={({ ref, open, onToggle, ...trigger }) => (
          <button {...trigger} ref={ref} onClick={onToggle}>Options</button>
        )}>
          <Select aria-label="Status" options={[{ value: "new", label: "New" }]} />
        </Popover>
      </Drawer>,
    );
    const popoverTrigger = getByRole("button", { name: "Options" });
    fireEvent.click(popoverTrigger);
    const select = getByRole("button", { name: "Status" });
    fireEvent.keyDown(select, { key: "ArrowDown" });
    fireEvent.keyDown(getByRole("option", { name: "New" }), { key: "Escape" });
    expect(queryByRole("listbox")).toBeNull();
    expect(getByRole("dialog", { name: "Options" })).toBeTruthy();
    expect(document.activeElement).toBe(select);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(select, { key: "Escape" });
    expect(queryByRole("dialog", { name: "Options" })).toBeNull();
    expect(document.activeElement).toBe(popoverTrigger);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(popoverTrigger, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("locks body scroll, renders a sticky footer, and closes on Escape", () => {
    const onClose = vi.fn();
    const { getByRole, getByText } = render(
      <Drawer open onClose={onClose} title="Filters" footer={<button>Apply</button>}>
        <button>First control</button>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    expect(getByRole("dialog").className).toContain("ink-drawer--mobile-sheet");
    expect(getByText("Apply").closest("footer")?.className).toContain("ink-drawer-footer");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("restores body overflow when closed", () => {
    const { rerender } = render(<Drawer open onClose={() => {}}>Body</Drawer>);
    rerender(<Drawer open={false} onClose={() => {}}>Body</Drawer>);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on backdrop click, and the backdrop is inert to assistive tech", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Drawer open onClose={onClose} title="Filters">
        <button>First control</button>
      </Drawer>,
    );
    const backdrop = container.querySelector(".ink-drawer-backdrop")!;
    expect(backdrop.getAttribute("aria-hidden")).toBe("true");
    expect(backdrop.tagName).toBe("DIV");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on backdrop click when closeOnBackdrop is false", () => {
    const onClose = vi.fn();
    const { container } = render(
      <Drawer open onClose={onClose} closeOnBackdrop={false} title="Filters">
        <button>First control</button>
      </Drawer>,
    );
    fireEvent.click(container.querySelector(".ink-drawer-backdrop")!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("supports custom shell slots and a full-bleed body", () => {
    const { container, getByRole, getByText } = render(
      <Drawer
        open
        onClose={() => {}}
        ariaLabel="Preferences"
        header={<div>Custom header</div>}
        headerClassName="drawer-header-test"
        bodyPadding="none"
        bodyClassName="drawer-body-test"
        footer={<button>Save changes</button>}
        footerClassName="drawer-footer-test"
      >
        Custom content
      </Drawer>,
    );

    expect(getByRole("dialog").getAttribute("aria-label")).toBe("Preferences");
    expect(getByText("Custom header").closest("header")?.className).toContain("drawer-header-test");
    expect(container.querySelector(".ink-drawer-body")?.className).toContain("ink-drawer-body--padding-none");
    expect(container.querySelector(".ink-drawer-body")?.className).toContain("drawer-body-test");
    expect(getByText("Save changes").closest("footer")?.className).toContain("drawer-footer-test");
  });

  it("focuses the panel when a custom layout has no focusable controls", () => {
    const { getByRole } = render(
      <Drawer open onClose={() => {}} ariaLabel="Details" header={<span>Details</span>}>
        Read-only content
      </Drawer>,
    );
    expect(document.activeElement).toBe(getByRole("dialog"));
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(getByRole("dialog"));
  });

  it("moves focus inside when opened after mount and wraps Tab at the edges", () => {
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();
    const { getByRole, rerender } = render(
      <Drawer open={false} onClose={() => {}} title="Filters"><button>First</button></Drawer>,
    );
    rerender(
      <Drawer open onClose={() => {}} title="Filters"><button>First</button></Drawer>,
    );
    const first = getByRole("button", { name: "Close drawer" });
    const last = getByRole("button", { name: "First" });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);
    rerender(
      <Drawer open={false} onClose={() => {}} title="Filters"><button>First</button></Drawer>,
    );
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });
});
