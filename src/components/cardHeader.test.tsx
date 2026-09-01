import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardHeader } from "./cardHeader";

describe("CardHeader", () => {
  it("keeps title and metadata in the header", () => {
    render(<CardHeader title="Role" metadata="Remote" />);
    expect(screen.getByText("Role").closest(".ink-card-header")?.textContent).toContain("Role");
    expect(screen.getByText("Remote")).toBeTruthy();
  });
});
