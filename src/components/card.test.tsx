import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Card, CardActions } from "./card";

const rootOf = (markup: ReturnType<typeof render>) => markup.container.firstChild as HTMLElement;

describe("Card", () => {
  it("renders the borderless base surface by default", () => {
    const el = rootOf(render(<Card>content</Card>));
    expect(el.className).toBe("card");
    expect(el.textContent).toBe("content");
  });

  it("adds the outlined variant", () => {
    const el = rootOf(render(<Card variant="outlined">x</Card>));
    expect(el.className).toBe("card card--outlined");
  });

  it("adds the danger tone, composable with outlined", () => {
    expect(rootOf(render(<Card tone="danger">x</Card>)).className).toBe("card card--danger");
    expect(rootOf(render(<Card variant="outlined" tone="danger">x</Card>)).className).toBe(
      "card card--outlined card--danger",
    );
  });

  it("appends className and passes native props", () => {
    const el = rootOf(render(<Card className="mt" role="group" aria-label="Round">x</Card>));
    expect(el.className).toBe("card mt");
    expect(el.getAttribute("role")).toBe("group");
    expect(el.getAttribute("aria-label")).toBe("Round");
  });
});

describe("CardActions", () => {
  it("renders the actions footer row", () => {
    const el = rootOf(render(<CardActions className="end">actions</CardActions>));
    expect(el.className).toBe("card-actions end");
    expect(el.textContent).toBe("actions");
  });
});
