import { useState } from "react";
import { Select } from "./ui.jsx";

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

export default {
  title: "Components/Select/Features",
};

export const FormVariant = {
  name: "Form variant",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)" }}>
        Active season
        <Controlled options={SEASON_OPTIONS} variant="form" />
      </label>
      <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)" }}>
        Commissioner team
        <Controlled options={TEAM_OPTIONS} placeholder="Choose a team…" variant="form" />
      </label>
    </div>
  ),
};

export const DisabledOptions = {
  name: "Disabled options",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)" }}>
        Claim an existing team
        <Controlled
          options={[
            { value: "", label: "Create a custom team below instead" },
            ...TEAM_OPTIONS,
          ]}
          variant="form"
        />
      </label>
    </div>
  ),
};

export const ControlVariant = {
  name: "Control variant",
  render: () => (
    <div style={{ background: "var(--color-surface-base, #0d0d0d)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <strong style={{ fontFamily: "League Spartan, sans-serif", fontSize: 14, color: "var(--color-text-primary)", letterSpacing: "0.03em" }}>COACHES POLL</strong>
      <Controlled options={LEAGUE_OPTIONS} variant="control" />
      <button className="secondary-button button--sm">Sign in</button>
    </div>
  ),
};

export const DisabledState = {
  name: "Disabled state",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 24, maxWidth: 400 }}>
      <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)" }}>
        Form — disabled
        <Select variant="form" value="" placeholder="No seasons yet" options={[]} disabled />
      </label>
      <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)" }}>
        Control — disabled
        <Select variant="control" value="" placeholder="No joined leagues yet" options={[]} disabled />
      </label>
    </div>
  ),
};
