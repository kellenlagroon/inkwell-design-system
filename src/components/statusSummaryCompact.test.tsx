import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusSummaryCompact } from "./statusSummaryCompact";

describe("StatusSummaryCompact", () => {
  it("provides a compact layout region without prescribing its children", () => {
    const { getByTestId, getByText } = render(
      <StatusSummaryCompact data-testid="summary" className="consumer-class">
        <span>Custom status content</span>
      </StatusSummaryCompact>,
    );

    expect(getByTestId("summary").className).toContain("status-summary-compact");
    expect(getByTestId("summary").className).toContain("consumer-class");
    expect(getByText("Custom status content")).toBeTruthy();
  });
});
