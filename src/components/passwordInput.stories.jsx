import { FormField, PasswordInput } from "./forms";

export default {
  title: "Components/PasswordInput",
};

export const Playground = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    autocomplete: "current-password",
    required: true,
    error: "",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    autocomplete: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
  },
  render: ({ label, placeholder, autocomplete, required, error }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label={label} required={required} error={error || undefined}>
        <PasswordInput placeholder={placeholder} autoComplete={autocomplete} />
      </FormField>
    </div>
  ),
};

