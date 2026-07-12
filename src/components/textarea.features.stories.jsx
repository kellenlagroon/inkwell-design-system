import { useState } from "react";
import { Textarea } from "./forms";

export default {
  title: "Components/Textarea/Features",
};

function Controlled({ initial = "", ...props }) {
  const [value, setValue] = useState(initial);
  return <Textarea value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export const Basic = {
  name: "Basic",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Controlled rows={5} placeholder="Add notes for coaches…" />
    </div>
  ),
};

export const States = {
  name: "States",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <Controlled rows={4} initial={"Best offense\nBest defense"} />
      <Textarea rows={4} placeholder="Disabled" disabled />
      <Textarea rows={4} placeholder="Invalid" invalid defaultValue="" />
    </div>
  ),
};
