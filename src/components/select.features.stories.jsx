import { useState } from "react";
import { Select } from "./ui.jsx";
import { selectOptions } from "../stories/storyData.jsx";

export default {
  title: "Components/Select/Features",
};

export const FormVariant = {
  render: function Render() {
    const [value, setValue] = useState("daily");
    return <Select value={value} onChange={setValue} options={selectOptions} placeholder="Select" aria-label="Form select" />;
  },
};

export const ControlVariant = {
  render: function Render() {
    const [value, setValue] = useState("monthly");
    return <Select value={value} onChange={setValue} options={selectOptions} variant="control" placeholder="Select" aria-label="Control select" />;
  },
};

export const DisabledSelect = {
  render: () => <Select value="" options={selectOptions} disabled placeholder="Unavailable" aria-label="Disabled select" />,
};
