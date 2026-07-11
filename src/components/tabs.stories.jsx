import { useState } from "react";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs",
};

const TABS = [
  { value: "poll", label: "Coaches Poll" },
  { value: "multi", label: "Multi-Category" },
  { value: "selection", label: "Team Selection" },
];

export const Playground = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState("poll");
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs tabs={TABS} value={value} onChange={setValue} aria-label="Active ballot type" id="ballot" />
          <div
            id={`ballot-panel-${value}`}
            role="tabpanel"
            aria-labelledby={`ballot-tab-${value}`}
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
