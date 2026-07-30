import { describe, it, expect } from "vitest";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { ModalFrame } from "./modalFrame";

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <ModalFrame title="Settings" titleId="settingsTitle" open={open} onClose={() => setOpen(false)}>
        <button>First</button>
        <button>Last</button>
      </ModalFrame>
    </div>
  );
}

describe("ModalFrame accessibility", () => {
  it("moves focus in, locks scroll, and resolves aria-labelledby when opened", () => {
    const { getByText, getByRole } = render(<Harness />);
    fireEvent.click(getByText("Open"));

    const dialog = getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    const labelId = dialog.getAttribute("aria-labelledby")!;
    expect(document.getElementById(labelId)?.textContent).toBe("Settings");

    const card = dialog.querySelector(".modal-card")!;
    expect(card.contains(document.activeElement)).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("Escape closes, restores scroll, and returns focus to the opener", () => {
    const { getByText, getByRole, queryByRole } = render(<Harness />);
    const opener = getByText("Open");
    opener.focus();
    fireEvent.click(opener);

    const dialog = getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });

    // A closed modal stops advertising itself as a dialog, so it no longer
    // shows up in the a11y tree even with `hidden: true`.
    expect(queryByRole("dialog", { hidden: true })).toBeNull();
    expect(dialog.className).toContain("hidden");
    expect(dialog.getAttribute("aria-hidden")).toBe("true");
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(opener);
  });

  it("names itself from `title` without a caller-supplied titleId", () => {
    const { getByRole } = render(
      <ModalFrame title="Settings" open onClose={() => {}}>
        <button>First</button>
      </ModalFrame>,
    );
    const dialog = getByRole("dialog");
    const labelId = dialog.getAttribute("aria-labelledby")!;
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId)?.textContent).toBe("Settings");
  });

  it("falls back to ariaLabel when there is no visible title", () => {
    const { getByRole } = render(
      <ModalFrame ariaLabel="Quick actions" open onClose={() => {}}>
        <button>First</button>
      </ModalFrame>,
    );
    expect(getByRole("dialog").getAttribute("aria-label")).toBe("Quick actions");
  });

  it("hides sibling content from assistive tech while open, and restores it on close", () => {
    const { getByText, container } = render(<Harness />);
    const sibling = document.createElement("div");
    sibling.textContent = "Behind the modal";
    container.parentElement!.appendChild(sibling);

    fireEvent.click(getByText("Open"));
    expect(sibling.getAttribute("aria-hidden")).toBe("true");

    fireEvent.click(getByText("Open").ownerDocument.querySelector(".modal-backdrop")!);
    expect(sibling.hasAttribute("aria-hidden")).toBe(false);
    sibling.remove();
  });

  it("omits the close button when showCloseButton is false", () => {
    const { queryByLabelText } = render(
      <ModalFrame title="Settings" open showCloseButton={false} onClose={() => {}}>
        <button>First</button>
      </ModalFrame>,
    );
    expect(queryByLabelText("Close")).toBeNull();
  });

  it("traps Tab within the dialog and wraps at both ends", () => {
    const { getByText, getByRole, getByLabelText } = render(<Harness />);
    fireEvent.click(getByText("Open"));
    const dialog = getByRole("dialog");
    const closeBtn = getByLabelText("Close");
    const last = getByText("Last");

    last.focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(document.activeElement).toBe(closeBtn);

    closeBtn.focus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });
});
