import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FormField, TextInput, Textarea, Checkbox, PasswordInput, FileUpload, FieldGroup } from "./forms";

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

  it("maps size to a class modifier", () => {
    const { getByRole } = render(<TextInput size="lg" aria-label="Search" />);
    expect(getByRole("textbox").className).toContain("input--lg");
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

  it("renders a custom visual control and exposes invalid state", () => {
    const { container, getByLabelText } = render(<Checkbox label="Agree" invalid />);
    expect(container.querySelector(".checkbox-control svg")).toBeTruthy();
    expect(getByLabelText("Agree").getAttribute("aria-invalid")).toBe("true");
    expect(container.firstElementChild?.className).toContain("checkbox--invalid");
  });
});

describe("PasswordInput", () => {
  it("toggles password visibility and keeps the accessible label", () => {
    const { getByLabelText } = render(
      <FormField label="Password">
        <PasswordInput />
      </FormField>,
    );
    const input = getByLabelText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");
    fireEvent.click(getByLabelText("Show password"));
    expect(input.type).toBe("text");
    expect(getByLabelText("Hide password")).toBeTruthy();
  });
});

describe("FileUpload", () => {
  it("inherits FormField wiring", () => {
    const { getByLabelText } = render(
      <FormField label="Resume" hint="PDF only">
        <FileUpload />
      </FormField>,
    );
    const input = getByLabelText("Resume") as HTMLInputElement;
    expect(input.type).toBe("file");
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
  });

  it("uses the responsive stacked layout by default", () => {
    const { container } = render(<FileUpload aria-label="Attachment" />);
    expect(container.firstElementChild?.className).toContain("file-upload--mobile");
  });

  it("renders removable styled file items", () => {
    const onFilesChange = vi.fn();
    const { getByLabelText, getByRole, queryByText } = render(
      <FileUpload aria-label="Attachment" fileDisplay="item" onFilesChange={onFilesChange} />,
    );
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    fireEvent.change(getByLabelText("Attachment"), { target: { files: [file] } });
    expect(getByRole("button", { name: "Remove test.pdf" })).toBeTruthy();
    fireEvent.click(getByRole("button", { name: "Remove test.pdf" }));
    expect(queryByText("test.pdf")).toBeNull();
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it("exposes an accessible dropzone option", () => {
    const { getByRole } = render(<FileUpload variant="dropzone" label="Upload attachment" />);
    expect(getByRole("button", { name: "Upload attachment" }).className).toContain("file-upload-dropzone");
  });

  it("renders initial styled file items", () => {
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    const { getByText } = render(<FileUpload fileDisplay="item" defaultFiles={[file]} />);
    expect(getByText("test.pdf")).toBeTruthy();
  });
});

describe("FieldGroup", () => {
  it("exposes a configurable collapse breakpoint", () => {
    const { container } = render(<FieldGroup columns={3} collapseBelow="sm">fields</FieldGroup>);
    expect(container.firstElementChild?.className).toContain("field-group--3");
    expect(container.firstElementChild?.className).toContain("field-group--collapse-sm");
  });
});
