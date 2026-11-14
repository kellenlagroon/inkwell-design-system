import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { CheckboxSelect } from "./checkboxSelect";

describe("CheckboxSelect", () => {
  it("uses full-width rows while the checkbox communicates selection", () => {
    const onChange = vi.fn();
    const { container, getByLabelText, getByRole } = render(
      <CheckboxSelect
        label="Filters"
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ]}
        value={["a"]}
        onChange={onChange}
      />,
    );

    fireEvent.click(getByRole("button", { name: "Filters (1)" }));

    expect((getByLabelText("Alpha") as HTMLInputElement).checked).toBe(true);
    expect(container.querySelector(".checkbox-select-option--selected")).toBeNull();
    fireEvent.click(getByLabelText("Beta"));
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
    expect(getByRole("group", { name: "Filters" })).toBeTruthy();
    expect(container.querySelector(".ink-popover-panel")?.getAttribute("aria-label")).toBe("Filters");
  });

  it("names an icon-labeled trigger and mobile panel from ariaLabel", () => {
    const { getByRole, container } = render(
      <CheckboxSelect
        label={<span aria-hidden="true">⚙</span>}
        ariaLabel="Job filters"
        options={[{ value: "a", label: "Alpha" }]}
        value={[]}
        onChange={() => {}}
      />,
    );
    fireEvent.click(getByRole("button", { name: "Job filters" }));
    expect(container.querySelector(".ink-popover-panel")?.getAttribute("aria-label")).toBe("Job filters");
    expect(getByRole("group", { name: "Job filters" })).toBeTruthy();
  });
});
