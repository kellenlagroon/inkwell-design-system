import { useState } from "react";
import { Checkbox } from "./forms";

export default {
  title: "Components/Checkbox",
};

function Controlled({ initial = false, ...props }) {
  const [checked, setChecked] = useState(initial);
  return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} {...props} />;
}

export const Playground = {
  args: {
    label: "Lock ballots at kickoff",
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: ({ label, disabled }) => (
    <div style={{ padding: 24 }}>
      <Controlled label={label} disabled={disabled} />
    </div>
  ),
};
