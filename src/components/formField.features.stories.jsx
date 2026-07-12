import { useState } from "react";
import { FormField, TextInput, Textarea } from "./forms";
import { Select } from "./ui.jsx";

export default {
  title: "Components/FormField/Features",
};

function ControlledInput(props) {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

const SEASON_OPTIONS = [
  { value: "2026", label: "2026 Season" },
  { value: "2025", label: "2025 Season" },
];

export const LabelAndHint = {
  name: "Label and hint",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Round name" hint="Shown to coaches on their ballot.">
        <ControlledInput placeholder="Week 8 Coaches Poll" />
      </FormField>
    </div>
  ),
};

export const Required = {
  name: "Required",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Commissioner email" required>
        <ControlledInput type="email" placeholder="coach@example.com" />
      </FormField>
    </div>
  ),
};

export const ErrorState = {
  name: "Error state",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Access code" required error="That access code isn’t recognized.">
        <ControlledInput type="text" defaultValue="XR-9" />
      </FormField>
    </div>
  ),
};

export const WrappingAnyControl = {
  name: "Wrapping any control",
  render: () => {
    const [season, setSeason] = useState("2026");
    return (
      <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 20 }}>
        <FormField label="Active season">
          <Select value={season} onChange={setSeason} options={SEASON_OPTIONS} variant="form" />
        </FormField>
        <FormField label="Notes" hint="Optional context for this round.">
          <Textarea rows={4} placeholder="Add notes for coaches…" />
        </FormField>
      </div>
    );
  },
};
