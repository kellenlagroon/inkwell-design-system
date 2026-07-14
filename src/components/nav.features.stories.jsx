import { useState } from "react";
import { Nav } from "./nav";
import { IconAward, IconList, IconSettings, IconTrophy, IconUsers } from "./icons.jsx";

export default {
  title: "Components/Nav/Features",
};

const APP_ITEMS = [
  { value: "ballot", label: "Ballot", icon: <IconAward /> },
  { value: "results", label: "Results", icon: <IconTrophy /> },
  { value: "commissioner", label: "Commissioner", icon: <IconSettings /> },
];

function ControlledNav({ items, orientation = "horizontal", initial }) {
  const [value, setValue] = useState(initial ?? items[0].value);
  return (
    <Nav items={items} value={value} onChange={setValue} orientation={orientation} aria-label="Primary" />
  );
}

export const Horizontal = {
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav items={APP_ITEMS} />
    </div>
  ),
};

export const ListVariant = {
  name: "List variant (sidebar-friendly)",
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "flex-start", background: "var(--bg)" }}>
      <div style={{ width: 240 }}>
        <ControlledNav
          orientation="vertical"
          variant="list"
          items={[
            { value: "overview", label: "Overview", icon: <IconList /> },
            { value: "players", label: "Players", icon: <IconUsers />, badge: 12 },
            { value: "results", label: "Results", icon: <IconTrophy />, badge: true },
            { value: "settings", label: "Settings", icon: <IconSettings /> },
          ]}
        />
      </div>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "flex-start" }}>
      <ControlledNav
        orientation="vertical"
        items={[
          { value: "overview", label: "Overview", icon: <IconList /> },
          { value: "players", label: "Players", icon: <IconUsers /> },
          { value: "results", label: "Results", icon: <IconTrophy /> },
          { value: "settings", label: "Settings", icon: <IconSettings /> },
        ]}
      />
    </div>
  ),
};

export const WithBadges = {
  name: "With badges",
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav
        items={[
          { value: "ballot", label: "Ballot", icon: <IconAward />, badge: 1 },
          { value: "results", label: "Results", icon: <IconTrophy />, badge: 12 },
          { value: "commissioner", label: "Commissioner", icon: <IconSettings /> },
        ]}
      />
    </div>
  ),
};

export const WithDotBadge = {
  name: "Dot-only badges",
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav
        items={[
          { value: "ballot", label: "Ballot", icon: <IconAward /> },
          { value: "results", label: "Results", icon: <IconTrophy />, badge: true },
          { value: "commissioner", label: "Commissioner", icon: <IconSettings />, badge: true },
        ]}
      />
    </div>
  ),
};

export const AsLinks = {
  name: "Href-based items",
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav
        items={[
          { value: "ballot", label: "Ballot", icon: <IconAward />, href: "#ballot" },
          { value: "results", label: "Results", icon: <IconTrophy />, href: "#results" },
          { value: "commissioner", label: "Commissioner", icon: <IconSettings />, href: "#commissioner" },
        ]}
      />
    </div>
  ),
};

export const LabelOnly = {
  name: "Label only",
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav
        items={[
          { value: "one", label: "Overview" },
          { value: "two", label: "Rounds" },
          { value: "three", label: "Roster" },
        ]}
      />
    </div>
  ),
};
