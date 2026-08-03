import { useState } from "react";
import { ActionGroup, Button, CheckboxSelect, Select } from "../index";

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

function FilterBar() {
  const [program, setProgram] = useState("all");
  const [stages, setStages] = useState([]);

  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
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
