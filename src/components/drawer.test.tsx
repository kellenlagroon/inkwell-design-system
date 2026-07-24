import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Drawer } from "./drawer";

describe("Drawer", () => {
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
});
