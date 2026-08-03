import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Panel, SectionHeading, EmptyState, Toast, ToastRegion } from "./ui";

describe("Panel", () => {
  it("renders a section and appends className rather than replacing the base class", () => {
    const { container } = render(<Panel className="mine">body</Panel>);
    const el = container.firstElementChild!;
    expect(el.tagName).toBe("SECTION");
    expect(el.className).toContain("panel");
    expect(el.className).toContain("mine");
  });

  it("forwards arbitrary props", () => {
    const { container } = render(<Panel data-testid="p" aria-label="Settings">x</Panel>);
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-testid")).toBe("p");
    expect(el.getAttribute("aria-label")).toBe("Settings");
  });
});

describe("SectionHeading", () => {
  it("wires titleId to the heading so aria-labelledby can resolve", () => {
    const { container } = render(<SectionHeading title="Members" titleId="t1" />);
    const h2 = container.querySelector("h2")!;
    expect(h2.id).toBe("t1");
    expect(h2.textContent).toBe("Members");
  });

  it("renders eyebrow, copy, and trailing children only when provided", () => {
    const { container, rerender } = render(<SectionHeading title="T" />);
    expect(container.querySelector(".eyebrow")).toBeNull();
    expect(container.querySelector(".section-heading-copy")).toBeNull();

    rerender(
      <SectionHeading title="T" eyebrow="Overview" copy="Supporting copy">
        <button>Action</button>
      </SectionHeading>,
    );
    expect(container.querySelector(".eyebrow")!.textContent).toBe("Overview");
    expect(container.querySelector(".section-heading-copy")!.textContent).toBe("Supporting copy");
    expect(container.querySelector("button")!.textContent).toBe("Action");
  });

  it("adds the compact modifier and appends className", () => {
    const { container } = render(<SectionHeading title="T" compact className="mine" />);
    const el = container.firstElementChild!;
    expect(el.className).toContain("compact");
    expect(el.className).toContain("section-heading");
    expect(el.className).toContain("mine");
  });
});

describe("EmptyState", () => {
  it("appends className rather than replacing the base class", () => {
    const { container } = render(<EmptyState className="mine">Nothing here</EmptyState>);
    const el = container.firstElementChild!;
    expect(el.className).toContain("empty-state");
    expect(el.className).toContain("mine");
  });
});

describe("Toast", () => {
  it("applies the tone as a class and carries aria-atomic itself", () => {
    const { container } = render(<Toast message="Saved" tone="success" />);
    const el = container.firstElementChild!;
    expect(el.className).toContain("toast");
    expect(el.className).toContain("success");
    // Atomic belongs on the toast, not the region, so one change doesn't
    // re-announce the whole queue.
    expect(el.getAttribute("aria-atomic")).toBe("true");
  });

  it("renders a dismiss control only when onDismiss is supplied", () => {
    const onDismiss = vi.fn();
    const { queryByLabelText, rerender, getByLabelText } = render(<Toast message="Saved" />);
    expect(queryByLabelText("Dismiss")).toBeNull();

    rerender(<Toast message="Saved" onDismiss={onDismiss} />);
    fireEvent.click(getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("allows relabelling the dismiss control", () => {
    const { getByLabelText } = render(<Toast message="x" onDismiss={() => {}} dismissLabel="Close" />);
    expect(getByLabelText("Close")).toBeTruthy();
  });
});

describe("ToastRegion", () => {
  it("stays mounted when empty, so the live region exists before content arrives", () => {
    const { getByRole } = render(<ToastRegion toasts={[]} />);
    const region = getByRole("status");
    expect(region.getAttribute("aria-live")).toBe("polite");
    expect(region.children.length).toBe(0);
  });

  it("does not carry aria-atomic on the region", () => {
    const { getByRole } = render(<ToastRegion toasts={[{ id: "a", message: "x" }]} />);
    expect(getByRole("status").hasAttribute("aria-atomic")).toBe(false);
  });

  it("renders toasts in the given order and reports the dismissed id", () => {
    const onDismiss = vi.fn();
    const { container, getAllByLabelText } = render(
      <ToastRegion
        toasts={[
          { id: "a", message: "First", tone: "success" },
          { id: "b", message: "Second", tone: "error" },
        ]}
        onDismiss={onDismiss}
      />,
    );
    expect([...container.querySelectorAll(".toast strong")].map((n) => n.textContent)).toEqual([
      "First",
      "Second",
    ]);
    fireEvent.click(getAllByLabelText("Dismiss")[1]!);
    expect(onDismiss).toHaveBeenCalledWith("b");
  });

  it("sets no hardcoded id, so two regions can coexist", () => {
    const { container } = render(
      <div>
        <ToastRegion toasts={[]} />
        <ToastRegion toasts={[]} />
      </div>,
    );
    const regions = [...container.querySelectorAll(".toast-region")];
    expect(regions.length).toBe(2);
    expect(regions.every((r) => !r.id)).toBe(true);
  });
});
