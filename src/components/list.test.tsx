import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { List } from "./list";

describe("List", () => {
  it("renders a role=list wrapper with role=listitem rows", () => {
    const { container, getAllByRole, getByRole } = render(
      <List columns="1fr auto">
        <List.Row>
          <span>Alpha</span>
          <span>1</span>
        </List.Row>
        <List.Row>
          <span>Bravo</span>
          <span>2</span>
        </List.Row>
      </List>,
    );
    expect(getByRole("list")).toBeTruthy();
    expect(getAllByRole("listitem").length).toBe(2);
    expect(container.querySelectorAll(".ink-list-row").length).toBe(2);
  });

  it("puts the columns template into the --ink-list-cols custom property", () => {
    const { container } = render(
      <List columns="1fr auto">
        <List.Row>x</List.Row>
      </List>,
    );
    const wrap = container.querySelector(".ink-list") as HTMLElement;
    expect(wrap.style.getPropertyValue("--ink-list-cols")).toBe("1fr auto");
  });

  it("applies density and bordered modifiers", () => {
    const { container, rerender } = render(
      <List columns="1fr">
        <List.Row>x</List.Row>
      </List>,
    );
    const wrap = () => container.querySelector(".ink-list")!;
    expect(wrap().classList.contains("ink-list--bordered")).toBe(true);
    expect(wrap().classList.contains("ink-list--compact")).toBe(false);

    rerender(
      <List columns="1fr" density="compact" bordered={false}>
        <List.Row>x</List.Row>
      </List>,
    );
    expect(wrap().classList.contains("ink-list--compact")).toBe(true);
    expect(wrap().classList.contains("ink-list--bordered")).toBe(false);
  });
});
