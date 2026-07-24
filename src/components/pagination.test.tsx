import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("uses labelled icon-only controls for previous and next", () => {
    const { getByRole } = render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    const previous = getByRole("button", { name: "Previous" });
    const next = getByRole("button", { name: "Next" });
    expect(previous.className).toContain("icon-btn");
    expect(previous.getAttribute("disabled")).not.toBeNull();
    expect(next.className).toContain("icon-btn");
  });

  it("renders an opt-in page-size selector and reports changes", () => {
    const onPageSizeChange = vi.fn();
    const { getByRole } = render(
      <Pagination
        page={2}
        pageCount={5}
        showPageSizeSelector
        pageSize={25}
        totalResults={118}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    fireEvent.click(getByRole("button", { name: "Results per page" }));
    fireEvent.click(getByRole("option", { name: "50" }));
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it("shows the compact result range when requested", () => {
    const { getByText } = render(<Pagination page={2} pageCount={10} pageSize={25} totalResults={238} compact />);
    expect(getByText("26–50 of 238")).toBeTruthy();
  });

  it("derives the page count from total results when page size changes", () => {
    const { getByRole, getByText } = render(<Pagination page={8} pageCount={10} pageSize={25} totalResults={100} compact />);
    expect(getByText("76–100 of 100")).toBeTruthy();
    expect(getByRole("button", { name: "Next" }).getAttribute("disabled")).not.toBeNull();
  });
});
