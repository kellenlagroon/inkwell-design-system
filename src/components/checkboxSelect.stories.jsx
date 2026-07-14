import { useState } from "react";
import { CheckboxSelect } from "./checkboxSelect";

export default {
  title: "Components/CheckboxSelect",
};

const OPTIONS = [
  { value: "greenhouse", label: "Greenhouse" },
  { value: "lever", label: "Lever" },
  { value: "ashby", label: "Ashby" },
  { value: "workday", label: "Workday" },
];

export const Playground = {
  args: {
    searchable: true,
  },
  argTypes: {
    searchable: { control: "boolean" },
  },
  render: ({ searchable }) => {
    const [value, setValue] = useState(["greenhouse"]);
    return (
      <div style={{ padding: 80 }}>
        <CheckboxSelect
          label="Sources"
          placeholder="Sources"
          options={OPTIONS}
          value={value}
          onChange={setValue}
          searchable={searchable}
        />
      </div>
    );
  },
};
