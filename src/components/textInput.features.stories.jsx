import { useState } from "react";
import { TextInput } from "./forms";

export default {
  title: "Components/TextInput/Features",
};

function Controlled({ initial = "", ...props }) {
  const [value, setValue] = useState(initial);
  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export const InputTypes = {
  name: "Input types",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <Controlled type="text" placeholder="Project title" />
      <Controlled type="search" placeholder="Search project items" />
      <Controlled type="email" placeholder="name@example.com" />
      <Controlled type="password" placeholder="Access code" />
    </div>
  ),
};

export const States = {
  name: "States",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <Controlled placeholder="Default" />
      <Controlled initial="Project Preferences" />
      <TextInput placeholder="Disabled" disabled />
      <TextInput placeholder="Invalid" invalid defaultValue="not-an-email" />
    </div>
  ),
};

export const Sizes = {
  name: "Sizes",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <Controlled size="sm" placeholder="Small input" />
      <Controlled size="md" placeholder="Medium input" />
      <Controlled size="lg" placeholder="Large input" />
    </div>
  ),
};
