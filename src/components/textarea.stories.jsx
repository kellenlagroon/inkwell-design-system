import { useState } from "react";
import { Textarea } from "./forms";

export default {
  title: "Components/Textarea",
};

function Controlled({ initial = "", ...props }) {
  const [value, setValue] = useState(initial);
  return <Textarea value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export const Playground = {
  args: {
    rows: 6,
    placeholder: "Best offense\nBest defense\nBiggest surprise",
    invalid: false,
    disabled: false,
  },
  argTypes: {
    rows: { control: { type: "number", min: 2, max: 16 } },
    placeholder: { control: "text" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: ({ rows, placeholder, invalid, disabled }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Controlled rows={rows} placeholder={placeholder} invalid={invalid} disabled={disabled} />
    </div>
  ),
};
