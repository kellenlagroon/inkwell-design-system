import { useState } from "react";
import { ActionGroup, Badge, Button, CheckboxSelect, Nav, Select } from "../index";

const PROGRAMS = [
  { value: "all", label: "All programs" },
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

const STAGES = [
  { value: "applied", label: "Applied" },
  { value: "review", label: "In review" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
];

export default {
  title: "Patterns/Filter bar",
};

function FilterBar({ theme, style, showTokenRoles = false }) {
  const [program, setProgram] = useState("all");
  const [stages, setStages] = useState([]);
  const [section, setSection] = useState("applications");

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
              { value: "applications", label: "Applications" },
              { value: "results", label: "Results" },
            ]}
            value={section}
            onChange={setSection}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge>Applied</Badge>
            <Badge tone="brand">2 selected</Badge>
          </div>
        </>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "end" }}>
        <div style={{ width: "min(100%, 220px)" }}>
          <Select aria-label="Program" variant="control" value={program} onChange={setProgram} options={PROGRAMS} />
        </div>
        <CheckboxSelect label="Stages" placeholder="Stages" options={STAGES} value={stages} onChange={setStages} />
        <ActionGroup stackBelow="sm" style={{ marginLeft: "auto" }}>
          <Button variant="ghost" size="sm" onClick={() => { setProgram("all"); setStages([]); }}>Clear</Button>
          <Button size="sm">Apply filters</Button>
        </ActionGroup>
      </div>
      <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
        {program === "all" ? "All programs" : PROGRAMS.find((option) => option.value === program)?.label} · {stages.length} stage{stages.length === 1 ? "" : "s"} selected
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
