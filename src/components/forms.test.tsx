import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FormField, TextInput, Textarea, Checkbox } from "./forms";

describe("FormField + TextInput", () => {
  it("associates the label with the control and wires the hint via aria-describedby", () => {
    const { getByLabelText, getByText } = render(
      <FormField label="Email" hint="We never share it.">
        <TextInput />
      </FormField>,
    );
    const input = getByLabelText("Email") as HTMLInputElement;
    const hint = getByText("We never share it.");
    expect(input.id).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toBe(hint.id);
  });

  it("error sets invalid, exposes role=alert, replaces the hint, and links it", () => {
    const { getByLabelText, getByRole, queryByText } = render(
      <FormField label="Email" hint="hint text" error="Enter a valid email">
        <TextInput />
      </FormField>,
    );
    const input = getByLabelText("Email");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.className).toContain("input--invalid");
    const alert = getByRole("alert");
    expect(alert.textContent).toBe("Enter a valid email");
    expect(queryByText("hint text")).toBeNull();
    expect(input.getAttribute("aria-describedby")).toContain(alert.id);
  });

  it("required is applied to the wrapped control", () => {
    const { getByLabelText } = render(
      <FormField label="Name" required>
        <TextInput />
      </FormField>,
    );
    expect((getByLabelText(/Name/) as HTMLInputElement).required).toBe(true);
  });

  it("forces the invalid style via the standalone prop", () => {
    const { getByRole } = render(<TextInput invalid aria-label="Code" />);
    const input = getByRole("textbox");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.className).toContain("input--invalid");
  });
});

describe("Textarea", () => {
  it("wires into a FormField as a textarea", () => {
    const { getByLabelText } = render(
      <FormField label="Bio">
        <Textarea />
      </FormField>,
    );
    expect(getByLabelText("Bio").tagName).toBe("TEXTAREA");
  });
});

describe("Checkbox", () => {
  it("renders an inline label and toggles", () => {
    const onChange = vi.fn();
    const { getByLabelText } = render(<Checkbox label="Agree" onChange={onChange} />);
    const box = getByLabelText("Agree") as HTMLInputElement;
    expect(box.type).toBe("checkbox");
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
