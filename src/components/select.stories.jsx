import { useState } from "react";
import { Select } from "./ui";

export default {
  title: "Components/Select",
};

const YEAR_OPTIONS = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

function Controlled({ options, placeholder, variant, disabled }) {
  const [value, setValue] = useState(options[0]?.value ?? "");
  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
    />
  );
}

export const Playground = {
  args: {
    variant: "form",
    placeholder: "Choose a reporting year…",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["form", "control"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: ({ variant, placeholder, disabled }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Controlled options={YEAR_OPTIONS} placeholder={placeholder} variant={variant} disabled={disabled} />
    </div>
  ),
};
