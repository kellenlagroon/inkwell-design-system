import { ControlTrigger } from "../index";

export default { title: "Components/ControlTrigger/Features" };
export const Densities = {
  render: () => <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <ControlTrigger density="compact" value="Compact" />
    <ControlTrigger value="Default" />
    <ControlTrigger density="comfortable" value="Comfortable" />
  </div>,
};
