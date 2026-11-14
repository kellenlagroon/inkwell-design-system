import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { StatusDetailsPopover } from "./statusDetailsPopover";

describe("StatusDetailsPopover", () => {
  it("shows a named dialog with evidence and actions, then returns focus on close", () => {
    const { getByRole, queryByRole } = render(
      <StatusDetailsPopover
        label="Verified"
        icon={<span>✓</span>}
        summary="Official source found"
        description="This posting has a matching source."
        evidence={<a href="#source">View source</a>}
        actions={<button type="button">Recheck</button>}
      />,
    );
    const trigger = getByRole("button", { name: /Verified Official source found/ });
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    fireEvent.click(trigger);
    expect(getByRole("dialog", { name: "Verified details" })).not.toBeNull();
    expect(getByRole("link", { name: "View source" })).not.toBeNull();
    fireEvent.click(getByRole("button", { name: "Close details" }));
    expect(queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("supports controlled state without owning verification behavior", () => {
    const onOpenChange = vi.fn();
    const { getByRole, queryByRole, rerender } = render(
      <StatusDetailsPopover label="Needs review" icon="!" open={false} onOpenChange={onOpenChange} />,
    );
    fireEvent.click(getByRole("button", { name: "Needs review" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(queryByRole("dialog")).toBeNull();
    rerender(<StatusDetailsPopover label="Needs review" icon="!" open onOpenChange={onOpenChange} />);
    expect(getByRole("dialog", { name: "Needs review details" })).not.toBeNull();
  });
});
