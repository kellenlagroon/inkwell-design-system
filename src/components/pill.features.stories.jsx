import { Pill } from "./ui.jsx";

export default {
  title: "Components/Pill/Features",
};

export const PillDefault = {
  render: () => <span className="pill">Commissioner</span>,
};

export const PillSuccess = {
  render: () => <Pill tone="success">Published</Pill>,
};

export const PillWarning = {
  render: () => <Pill tone="warning">Open</Pill>,
};

export const PillDanger = {
  render: () => <Pill tone="danger">Attention required</Pill>,
};

export const PillAllVariants = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Pill>Commissioner</Pill>
      <Pill tone="success">Published</Pill>
      <Pill tone="warning">Open</Pill>
      <Pill tone="danger">Attention required</Pill>
    </div>
  ),
};
