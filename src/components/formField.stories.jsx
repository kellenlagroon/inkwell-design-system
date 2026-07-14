import { useState } from "react";
import { FormField, TextInput } from "./forms";

export default {
  title: "Components/FormField",
};

function ControlledInput(props) {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export const Playground = {
  args: {
    label: "Cycle name",
    hint: "Shown to reviewers on their submission.",
    error: "",
    required: false,
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
  },
  render: ({ label, hint, error, required }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label={label} hint={hint} error={error || undefined} required={required}>
        <ControlledInput placeholder="Quarterly Planning Review" />
      </FormField>
    </div>
  ),
};
