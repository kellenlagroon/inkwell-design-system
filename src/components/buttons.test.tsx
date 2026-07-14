import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Button, ButtonLink } from "./button";
import { IconButton } from "./iconButton";
import { Pill } from "./pill";
import { StatusBanner } from "./statusBanner";

const classOf = (el: Element) => el.getAttribute("class") ?? "";

describe("Button", () => {
  it("defaults to primary md with no size modifier", () => {
    const { getByRole } = render(<Button>Save</Button>);
    expect(classOf(getByRole("button"))).toBe("primary-button");
  });

  it("maps variant and size to classes", () => {
    const { getByRole } = render(
      <Button variant="secondary" size="sm">
        x
      </Button>,
    );
    expect(classOf(getByRole("button"))).toBe("secondary-button button--sm");
  });

  it("appends extra className after the variant class", () => {
    const { getByRole } = render(
      <Button variant="ghost" className="modal-close-button">
        x
      </Button>,
    );
    expect(classOf(getByRole("button"))).toBe("ghost-button modal-close-button");
  });

  it("passes through native button props", () => {
    const { getByRole } = render(
      <Button type="submit" disabled>
        x
      </Button>,
    );
    const btn = getByRole("button") as HTMLButtonElement;
    expect(btn.type).toBe("submit");
    expect(btn.disabled).toBe(true);
  });

  it("renders link-backed actions with external rel defaults", () => {
    const { getByRole } = render(
      <Button as="a" href="https://example.com" target="_blank">
        Resume
      </Button>,
    );
    const link = getByRole("link") as HTMLAnchorElement;
    expect(link.className).toBe("primary-button");
    expect(link.rel).toContain("noopener");
    expect(link.rel).toContain("noreferrer");
  });

  it("prevents disabled link-backed actions", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ButtonLink href="/next" disabled onClick={onClick}>
        Next
      </ButtonLink>,
    );
    const link = getByRole("link") as HTMLAnchorElement;
    expect(link.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("marks loading actions busy and preserves the original label for layout", () => {
    const { getByRole, getByText } = render(
      <Button loading loadingLabel="Saving">
        Save
      </Button>,
    );
    const btn = getByRole("button") as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("aria-busy")).toBe("true");
    expect(getByText("Save").className).toContain("button-label--hidden");
    expect(getByText("Saving")).toBeTruthy();
  });

  it("supports full-width button and link actions", () => {
    expect(classOf(render(<Button fullWidth>Save</Button>).getByRole("button"))).toContain("button--full-width");
    expect(classOf(render(<ButtonLink fullWidth href="/next">Next</ButtonLink>).getByRole("link"))).toContain("button--full-width");
  });
});

describe("IconButton", () => {
  it("defaults to icon-btn with no size modifier", () => {
    const { getByRole } = render(<IconButton icon={<i />} aria-label="More" />);
    expect(classOf(getByRole("button"))).toBe("icon-btn");
  });

  it("maps size to a modifier class", () => {
    const { getByRole } = render(<IconButton icon={<i />} size="sm" aria-label="More" />);
    expect(classOf(getByRole("button"))).toBe("icon-btn icon-btn--sm");
  });
});

describe("Pill", () => {
  it("defaults to a neutral pill", () => {
    const { getByText } = render(<Pill>Draft</Pill>);
    expect(classOf(getByText("Draft"))).toBe("pill");
  });

  it("appends the tone", () => {
    const { getByText } = render(<Pill tone="success">Live</Pill>);
    expect(classOf(getByText("Live"))).toBe("pill success");
  });
});

describe("StatusBanner", () => {
  it("renders nothing without a message", () => {
    const { container } = render(<StatusBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("adds the error tone and calls onDismiss", () => {
    const onDismiss = vi.fn();
    const { getByText, getByLabelText } = render(
      <StatusBanner message="Something went wrong" tone="error" onDismiss={onDismiss} />,
    );
    const banner = getByText("Something went wrong").parentElement!;
    expect(classOf(banner)).toBe("status-banner status-banner--danger");
    fireEvent.click(getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("success tone uses the default styling (no modifier)", () => {
    const { getByText } = render(<StatusBanner message="Saved" tone="success" />);
    expect(classOf(getByText("Saved").parentElement!)).toBe("status-banner");
  });

  it("maps danger tone to a semantic modifier", () => {
    const { getByText } = render(<StatusBanner message="Failed" tone="danger" />);
    expect(classOf(getByText("Failed").parentElement!)).toBe("status-banner status-banner--danger");
  });
});
