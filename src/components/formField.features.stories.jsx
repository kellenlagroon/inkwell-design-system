import { useState } from "react";
import { FormField, TextInput, Textarea } from "./forms";
import { Select } from "./ui";

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
      <FormField label="Cycle name" hint="Shown to reviewers on their submission.">
        <ControlledInput placeholder="Quarterly Planning Review" />
      </FormField>
    </div>
  ),
};

export const Required = {
  name: "Required",
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Administrator email" required>
        <ControlledInput type="email" placeholder="name@example.com" />
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
        <FormField label="Notes" hint="Optional context for this cycle.">
          <Textarea rows={4} placeholder="Add notes for reviewers…" />
        </FormField>
      </div>
    );
  },
};
