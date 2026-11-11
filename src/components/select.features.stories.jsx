import { useState } from "react";
import { Button, Select } from "./ui";
import { FormField } from "./forms";
import { Stack } from "./layout";

const YEAR_OPTIONS = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

const WORKSPACE_OPTIONS = [
  { value: "northstar", label: "Northstar Workspace" },
  { value: "summit", label: "Summit Workspace" },
  { value: "cedar", label: "Cedar Workspace" },
];

const OWNER_OPTIONS = [
  { value: "maya", label: "Maya Chen" },
  { value: "marcus", label: "Marcus Webb" },
  { value: "priya", label: "Priya Nair" },
  { value: "devin", label: "Devin Torres" },
  { value: "alex", label: "Alex Morgan · unavailable", disabled: true },
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
    <Stack gap="lg" style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Reporting year">
        <Controlled options={YEAR_OPTIONS} variant="form" />
      </FormField>
      <FormField label="Owner">
        <Controlled options={OWNER_OPTIONS} placeholder="Choose an owner…" variant="form" />
      </FormField>
    </Stack>
  ),
};

export const DisabledOptions = {
  name: "Disabled options",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Owner">
        <Controlled
          options={[
            { value: "", label: "Unassigned" },
            ...OWNER_OPTIONS,
          ]}
          variant="form"
        />
      </FormField>
    </div>
  ),
};

export const ControlVariant = {
  name: "Control variant",
  render: () => (
    <div style={{ background: "var(--color-surface-base, #0d0d0d)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <strong style={{ fontFamily: "League Spartan, sans-serif", fontSize: 14, color: "var(--color-text-primary)", letterSpacing: "0.03em" }}>INKWELL</strong>
      <Controlled options={WORKSPACE_OPTIONS} variant="control" />
      <Button variant="secondary" size="sm">Sign in</Button>
    </div>
  ),
};

export const DisabledState = {
  name: "Disabled state",
  render: () => (
    <Stack gap="xl" style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Form — disabled">
        <Select variant="form" value="" placeholder="No reporting years available" options={[]} disabled />
      </FormField>
      <FormField label="Control — disabled">
        <Select variant="control" value="" placeholder="No workspaces yet" options={[]} disabled />
      </FormField>
    </Stack>
  ),
};
