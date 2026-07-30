import { useState } from "react";
import { Tabs } from "./tabs";

export default {
  title: "Components/Tabs/Features",
};

export const Basic = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState("overview");
      const tabs = [
        { value: "overview", label: "Overview" },
        { value: "submissions", label: "Submissions" },
        { value: "results", label: "Results" },
      ];
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs tabs={tabs} value={value} onChange={setValue} aria-label="Section" />
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithDisabledTab = {
  name: "With a disabled tab",
  render: () => {
    function Demo() {
      const [value, setValue] = useState("open");
      const tabs = [
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
        { value: "published", label: "Published", disabled: true },
      ];
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs tabs={tabs} value={value} onChange={setValue} aria-label="Review status" />
        </div>
      );
    }
    return <Demo />;
  },
};

export const CustomStyling = {
  name: "Custom styling",
  render: () => {
    function Demo() {
      const [value, setValue] = useState("overview");
      const tabs = [
        { value: "overview", label: "Overview" },
        { value: "submissions", label: "Submissions" },
        { value: "results", label: "Results" },
      ];
      return (
        <div style={{ padding: 24, maxWidth: 480 }}>
          <Tabs
            tabs={tabs}
            value={value}
            onChange={setValue}
            aria-label="Section"
            style={{
              "--ink-tabs-gap": "0",
              "--ink-tabs-border-color": "var(--color-border-strong)",
              "--ink-tabs-tab-padding-inline": "var(--space-3)",
              "--ink-tabs-tab-color": "var(--color-text-secondary)",
              "--ink-tabs-active-color": "var(--color-info)",
              "--ink-tabs-indicator-color": "var(--color-info)",
            }}
          />
        </div>
      );
    }
    return <Demo />;
  },
};
