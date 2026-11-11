import { useState } from "react";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs",
};

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

export const Playground = {
  args: { variant: "underline", shape: "rounded" },
  argTypes: {
    variant: { control: "inline-radio", options: ["underline", "segmented"] },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
  },
  render: ({ variant, shape }) => {
    function Demo() {
      const [value, setValue] = useState("overview");
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs tabs={TABS} value={value} onChange={setValue} aria-label="Record details" id="record-details" variant={variant} shape={shape} />
          <div
            id={`record-details-panel-${value}`}
            role="tabpanel"
            aria-labelledby={`record-details-tab-${value}`}
            style={{ paddingTop: 20, color: "var(--color-text-primary)" }}
          >
            {TABS.find((t) => t.value === value)?.label} content
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
