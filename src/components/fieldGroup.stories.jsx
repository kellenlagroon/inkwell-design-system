import { FormField, TextInput, FieldGroup, Button } from "../index";

export default {
  title: "Components/FieldGroup",
};

export const Playground = {
  args: {
    columns: 2,
  },
  argTypes: {
    columns: { control: "inline-radio", options: [2, 3, 4] },
  },
  render: ({ columns }) => (
    <div style={{ padding: 24, maxWidth: 760 }}>
      <FieldGroup columns={columns}>
        <FormField label="Project">
          <TextInput placeholder="Website refresh" />
        </FormField>
        <FormField label="Owner">
          <TextInput placeholder="Maya Chen" />
        </FormField>
        <Button variant="secondary">Add project</Button>
      </FieldGroup>
    </div>
  ),
};
