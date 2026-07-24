import { useState } from "react";
import { CheckboxSelect } from "./checkboxSelect";

export default {
  title: "Components/CheckboxSelect/Features",
};

const OPTIONS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
  { value: "other", label: "Other", disabled: true },
];

function Demo(props) {
  const [value, setValue] = useState(["design", "engineering"]);
  return (
    <div style={{ padding: 80 }}>
      <CheckboxSelect options={OPTIONS} value={value} onChange={setValue} label="Categories" placeholder="Categories" {...props} />
    </div>
  );
}

export const WithSearch = {
  render: () => <Demo searchable />,
};

export const WithoutSearch = {
  render: () => <Demo searchable={false} />,
};
