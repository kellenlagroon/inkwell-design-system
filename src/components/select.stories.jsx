import { useState } from "react";
import { Select } from "./ui.jsx";
import { selectOptions } from "../stories/storyData.jsx";

export default {
  title: "Components/Select",
};

export const SelectPlayground = {
  name: "Playground",
  render: function Render() {
    const [value, setValue] = useState("weekly");
    return (
      <Select
        value={value}
        onChange={setValue}
        options={selectOptions}
        placeholder="Choose a cadence"
        aria-label="Cadence"
      />
    );
  },
};
