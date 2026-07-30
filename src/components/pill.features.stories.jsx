import { Pill } from "./ui";

export default {
  title: "Components/Pill/Features",
};

export const PillDefault = {
  render: () => <Pill>Administrator</Pill>,
};

export const BorderedInformation = {
  name: "Bordered information",
  render: () => <Pill tone="info" appearance="bordered">In review</Pill>,
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
      <Pill>Administrator</Pill>
      <Pill tone="info" appearance="bordered">In review</Pill>
      <Pill tone="success">Published</Pill>
      <Pill tone="warning">Open</Pill>
      <Pill tone="danger">Attention required</Pill>
    </div>
  ),
};

export const CustomColors = {
  name: "Custom colors",
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Pill colors={{ foreground: "#365314", background: "#ecfccb", border: "#84cc16" }}>Campaign</Pill>
      <Pill appearance="borderless" colors={{ foreground: "#7e22ce", background: "#f3e8ff" }}>Research</Pill>
    </div>
  ),
};
