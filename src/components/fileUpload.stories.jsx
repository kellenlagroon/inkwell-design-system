import { FormField, FileUpload } from "./forms";

export default {
  title: "Components/FileUpload",
};

export const Playground = {
  args: {
    label: "Choose resume",
    accept: ".pdf,.doc,.docx",
    hint: "PDF or Word document.",
    error: "",
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    accept: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: ({ label, accept, hint, error, disabled }) => (
    <div style={{ padding: 24, maxWidth: 460 }}>
      <FormField label="Resume" hint={hint} error={error || undefined}>
        <FileUpload label={label} accept={accept} disabled={disabled} />
      </FormField>
    </div>
  ),
};
