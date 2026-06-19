import { useState } from "react";
import { Select } from "./ui.jsx";

export default {
  title: "Components/Select",
};

const SEASON_OPTIONS = [
  { value: "2026", label: "2026 Season" },
  { value: "2025", label: "2025 Season" },
  { value: "2024", label: "2024 Season" },
  { value: "2023", label: "2023 Season" },
];

const LEAGUE_OPTIONS = [
  { value: "l1", label: "Dynasty League · Alabama" },
  { value: "l2", label: "CFB Open · Georgia" },
  { value: "l3", label: "Rivalry Bowl · Michigan" },
];

const TEAM_OPTIONS = [
  { value: "t1", label: "Alabama · Jordan Fields" },
  { value: "t2", label: "Georgia · Marcus Webb" },
  { value: "t3", label: "Ohio State · Priya Nair" },
  { value: "t4", label: "Michigan · Devin Torres" },
  { value: "t5", label: "Clemson · already claimed", disabled: true },
];

function Controlled({ options, placeholder, variant, disabled }) {
  const [value, setValue] = useState(options[0]?.value ?? "");
  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
    />
  );
}

export const Playground = {
  args: {
    variant: "form",
    placeholder: "Choose a season…",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["form", "control"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: ({ variant, placeholder, disabled }) => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Controlled options={SEASON_OPTIONS} placeholder={placeholder} variant={variant} disabled={disabled} />
    </div>
  ),
};
