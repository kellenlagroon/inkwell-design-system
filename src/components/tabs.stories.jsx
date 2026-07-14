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
  render: () => {
    function Demo() {
      const [value, setValue] = useState("overview");
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs tabs={TABS} value={value} onChange={setValue} aria-label="Active submission type" id="submission" />
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
