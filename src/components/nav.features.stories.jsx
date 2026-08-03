import { useState } from "react";
import { Nav } from "./nav";
import { IconAward, IconList, IconSettings, IconTrophy, IconUsers } from "./icons.jsx";

export default {
  title: "Components/Nav/Features",
};

const APP_ITEMS = [
  { value: "submission", label: "Submission", icon: <IconAward /> },
  { value: "results", label: "Results", icon: <IconTrophy /> },
  { value: "administrator", label: "Administrator", icon: <IconSettings /> },
];

function ControlledNav({ items, orientation = "horizontal", variant, initial, ...props }) {
  const [value, setValue] = useState(initial ?? items[0].value);
  return (
    <Nav items={items} value={value} onChange={setValue} orientation={orientation} variant={variant} aria-label="Primary" {...props} />
  );
}

export const Horizontal = {
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav items={APP_ITEMS} />
    </div>
  ),
};

export const EqualWidth = {
  name: "Equal-width horizontal",
  render: () => (
    <div style={{ padding: 32, maxWidth: 720, margin: "auto" }}>
      <ControlledNav equalWidth items={APP_ITEMS} />
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
            { value: "members", label: "Members", icon: <IconUsers />, badge: 12 },
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
          { value: "members", label: "Members", icon: <IconUsers /> },
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
          { value: "submission", label: "Submission", icon: <IconAward />, badge: 1 },
          { value: "results", label: "Results", icon: <IconTrophy />, badge: 12 },
          { value: "administrator", label: "Administrator", icon: <IconSettings /> },
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
          { value: "submission", label: "Submission", icon: <IconAward /> },
          { value: "results", label: "Results", icon: <IconTrophy />, badge: true },
          { value: "administrator", label: "Administrator", icon: <IconSettings />, badge: true },
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
          { value: "submission", label: "Submission", icon: <IconAward />, href: "#submission" },
          { value: "results", label: "Results", icon: <IconTrophy />, href: "#results" },
          { value: "administrator", label: "Administrator", icon: <IconSettings />, href: "#administrator" },
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
          { value: "three", label: "Directory" },
        ]}
      />
    </div>
  ),
};

export const CustomStyling = {
  render: () => (
    <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
      <ControlledNav
        items={APP_ITEMS}
        style={{
          "--ink-nav-track-padding": "var(--space-1)",
          "--ink-nav-item-padding-inline": "var(--space-3)",
          "--ink-nav-slider-background": "color-mix(in srgb, var(--color-info) 16%, transparent)",
          "--ink-nav-active-color": "var(--color-info)",
        }}
      />
    </div>
  ),
};
