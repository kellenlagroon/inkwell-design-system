import { useState } from "react";
import { CheckboxSelect } from "./checkboxSelect";

export default {
  title: "Components/CheckboxSelect/Features",
};

const OPTIONS = [
  { value: "greenhouse", label: "Greenhouse" },
  { value: "lever", label: "Lever" },
  { value: "ashby", label: "Ashby" },
  { value: "workday", label: "Workday" },
  { value: "custom", label: "Custom source", disabled: true },
];

function Demo(props) {
  const [value, setValue] = useState(["greenhouse", "lever"]);
  return (
    <div style={{ padding: 80 }}>
      <CheckboxSelect options={OPTIONS} value={value} onChange={setValue} label="Sources" placeholder="Sources" {...props} />
    </div>
  );
}

export const WithSearch = {
  render: () => <Demo searchable />,
};

export const WithoutSearch = {
  render: () => <Demo searchable={false} />,
};

