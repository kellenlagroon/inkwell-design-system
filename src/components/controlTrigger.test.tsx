import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ControlTrigger } from "./controlTrigger";

describe("ControlTrigger", () => {
  it("renders value, count, and accessible state", () => {
    render(<ControlTrigger value="Stages" count={2} aria-expanded={false} />);
    expect(screen.getByRole("button", { name: "Stages 2" }).getAttribute("aria-expanded")).toBe("false");
  });
});
