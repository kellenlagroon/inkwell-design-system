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
        { value: "ballots", label: "Ballots" },
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
          <Tabs tabs={tabs} value={value} onChange={setValue} aria-label="Round status" />
        </div>
      );
    }
    return <Demo />;
  },
};
