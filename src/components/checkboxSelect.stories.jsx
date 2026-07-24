import { useState } from "react";
import { CheckboxSelect } from "./checkboxSelect";

export default {
  title: "Components/CheckboxSelect",
};

const OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
];

export const Playground = {
  args: {
    searchable: true,
  },
  argTypes: {
    searchable: { control: "boolean" },
  },
  render: ({ searchable }) => {
    const [value, setValue] = useState(["design"]);
    return (
      <div style={{ padding: 80 }}>
        <CheckboxSelect
          label="Categories"
          placeholder="Categories"
          options={OPTIONS}
          value={value}
          onChange={setValue}
          searchable={searchable}
        />
      </div>
    );
  },
};
