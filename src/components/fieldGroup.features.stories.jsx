import { Button, FieldGroup, FormField, Select, TextInput } from "../index";

export default {
  title: "Components/FieldGroup/Features",
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "saved", label: "Saved" },
  { value: "archived", label: "Archived" },
];

export const TwoColumns = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <FieldGroup columns={2}>
        <FormField label="Project">
          <TextInput placeholder="Website refresh" />
        </FormField>
        <FormField label="Owner">
          <TextInput placeholder="Maya Chen" />
        </FormField>
      </FieldGroup>
    </div>
  ),
};

export const WithAlignedAction = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 840 }}>
      <FieldGroup columns={3}>
        <FormField label="Project">
          <TextInput placeholder="Website refresh" />
        </FormField>
        <FormField label="Status">
          <Select options={STATUS_OPTIONS} value="active" />
        </FormField>
        <Button variant="secondary">Apply filters</Button>
      </FieldGroup>
    </div>
  ),
};
