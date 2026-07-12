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
      <Controlled initial label="Lock ballots at kickoff" />
    </div>
  ),
};

export const Group = {
  name: "Group",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <Controlled initial label="Lock ballots at kickoff" />
      <Controlled label="Allow late submissions" />
      <Controlled label="Email coaches a reminder" />
    </div>
  ),
};

export const Disabled = {
  name: "Disabled",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <Checkbox label="Archived round" checked disabled />
      <Checkbox label="Unavailable option" disabled />
    </div>
  ),
};
