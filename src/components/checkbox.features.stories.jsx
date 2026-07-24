import { useState } from "react";
import { Checkbox } from "./forms";

export default {
  title: "Components/Checkbox/Features",
};

function Controlled({ initial = false, ...props }) {
  const [checked, setChecked] = useState(initial);
  return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} {...props} />;
}

export const SingleChoice = {
  name: "Single choice",
  render: () => (
    <div style={{ padding: 24 }}>
      <Controlled initial label="Receive email updates" />
    </div>
  ),
};

export const Group = {
  name: "Group",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <Controlled initial label="Receive email updates" />
      <Controlled label="Share usage data" />
      <Controlled label="Enable product tips" />
    </div>
  ),
};

export const Disabled = {
  name: "Disabled",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <Checkbox label="Enabled setting" checked disabled />
      <Checkbox label="Unavailable setting" disabled />
    </div>
  ),
};

export const Invalid = {
  name: "Invalid",
  render: () => (
    <div style={{ padding: 24 }}>
      <Checkbox label="I agree to the terms" invalid />
    </div>
  ),
};
