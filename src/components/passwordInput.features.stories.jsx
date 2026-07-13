import { FormField, PasswordInput } from "./forms";

export default {
  title: "Components/PasswordInput/Features",
};

export const Default = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Password" required>
        <PasswordInput placeholder="Enter password" />
      </FormField>
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <FormField label="Password" required error="Password is required.">
        <PasswordInput placeholder="Enter password" />
      </FormField>
    </div>
  ),
};

export const AutocompleteModes = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 400, display: "grid", gap: 16 }}>
      <FormField label="Current password">
        <PasswordInput autoComplete="current-password" />
      </FormField>
      <FormField label="New password">
        <PasswordInput autoComplete="new-password" />
      </FormField>
    </div>
  ),
};

