import { useState } from "react";
import { ActionGroup, Badge, Button, CheckboxSelect, Nav, Select } from "../index";

const CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "documentation", label: "Documentation" },
  { value: "research", label: "Research" },
];

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export default {
  title: "Patterns/Filter bar",
};

function FilterBar({ theme, style, showTokenRoles = false }) {
  const [category, setCategory] = useState("all");
  const [statuses, setStatuses] = useState([]);
  const [section, setSection] = useState("records");

  return (
    <div
      data-theme={theme}
      className={theme ? "inkwell-page" : undefined}
      style={{ padding: 24, display: "grid", gap: 16, minWidth: 0, ...style }}
    >
      {showTokenRoles ? (
        <>
          <Nav
            equalWidth
            aria-label={`${theme} example navigation`}
            items={[
              { value: "overview", label: "Overview" },
              { value: "records", label: "Records" },
              { value: "activity", label: "Activity" },
            ]}
            value={section}
            onChange={setSection}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge>Draft</Badge>
            <Badge tone="brand">2 selected</Badge>
          </div>
        </>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "end" }}>
        <div style={{ width: "min(100%, 220px)" }}>
          <Select aria-label="Category" variant="control" value={category} onChange={setCategory} options={CATEGORIES} />
        </div>
        <CheckboxSelect label="Statuses" placeholder="Statuses" options={STATUSES} value={statuses} onChange={setStatuses} />
        <ActionGroup stackBelow="sm" style={{ marginLeft: "auto" }}>
          <Button variant="ghost" size="sm" onClick={() => { setCategory("all"); setStatuses([]); }}>Clear</Button>
          <Button size="sm">Apply filters</Button>
        </ActionGroup>
      </div>
      <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
        {category === "all" ? "All categories" : CATEGORIES.find((option) => option.value === category)?.label} · {statuses.length} {statuses.length === 1 ? "status" : "statuses"} selected
      </span>
    </div>
  );
}

export const ResponsiveComposition = {
  name: "Select, multi-select, and actions",
  render: () => <FilterBar />,
};

const SHARED_ROLE_OVERRIDES = {
  "--nav-active-bg": "var(--color-overlay-strong)",
  "--nav-active-fg": "var(--color-text-primary)",
  "--link-fg": "var(--color-info)",
};

const DARK_ROLE_OVERRIDES = {
  ...SHARED_ROLE_OVERRIDES,
  "--button-primary-bg": "var(--color-info)",
  "--button-primary-bg-hover": "var(--color-info)",
  "--button-primary-fg": "var(--ink-950)",
  "--badge-brand-bg": "var(--color-info)",
  "--badge-filled-fg": "var(--ink-950)",
};

const LIGHT_ROLE_OVERRIDES = {
  ...SHARED_ROLE_OVERRIDES,
  "--button-primary-bg": "var(--color-info)",
  "--button-primary-bg-hover": "var(--color-info)",
  "--button-primary-fg": "var(--color-text-inverse)",
  "--badge-brand-bg": "var(--color-info)",
  "--badge-filled-fg": "var(--color-text-inverse)",
};

export const ThemeTokenOverrides = {
  name: "Light and dark token overrides",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 16 }}>
      <FilterBar theme="dark" style={DARK_ROLE_OVERRIDES} showTokenRoles />
      <FilterBar theme="light" style={LIGHT_ROLE_OVERRIDES} showTokenRoles />
    </div>
  ),
};
