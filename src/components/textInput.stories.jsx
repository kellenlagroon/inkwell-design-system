import { useState } from "react";
import { TextInput } from "./forms";

export default {
  title: "Components/TextInput",
};

function Controlled({ initial = "", ...props }) {
  const [value, setValue] = useState(initial);
  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export const Playground = {
  args: {
    type: "text",
    placeholder: "Week 8 Coaches Poll",
    invalid: false,
    disabled: false,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "search", "email", "password", "url", "number"],
    },
    placeholder: { control: "text" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: ({ type, placeholder, invalid, disabled }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Controlled type={type} placeholder={placeholder} invalid={invalid} disabled={disabled} />
    </div>
  ),
};
