import { useState } from "react";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs",
};

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "multi", label: "Multi-Category" },
  { value: "selection", label: "Settings" },
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
          <Tabs tabs={TABS} value={value} onChange={setValue} aria-label="Active submission type" id="submission" variant={variant} shape={shape} />
          <div
            id={`submission-panel-${value}`}
            role="tabpanel"
            aria-labelledby={`submission-tab-${value}`}
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
