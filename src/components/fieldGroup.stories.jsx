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
        <FormField label="Company">
          <TextInput placeholder="Lagroon" />
        </FormField>
        <FormField label="Role">
          <TextInput placeholder="Product Designer" />
        </FormField>
        <Button variant="secondary">Add application</Button>
      </FieldGroup>
    </div>
  ),
};
