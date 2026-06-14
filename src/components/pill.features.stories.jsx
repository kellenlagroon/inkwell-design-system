import { Pill } from "./ui.jsx";

export default {
  title: "Components/Pill/Features",
};

export const ToneSet = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Pill>Default</Pill>
      <Pill tone="success">Success</Pill>
      <Pill tone="warning">Warning</Pill>
      <Pill tone="danger">Danger</Pill>
    </div>
  ),
};
