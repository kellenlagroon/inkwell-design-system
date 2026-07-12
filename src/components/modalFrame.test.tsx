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
    const { getByText, getByRole } = render(<Harness />);
    const opener = getByText("Open");
    opener.focus();
    fireEvent.click(opener);

    fireEvent.keyDown(getByRole("dialog"), { key: "Escape" });

    expect(getByRole("dialog", { hidden: true }).className).toContain("hidden");
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(opener);
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
