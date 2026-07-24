import { useMemo, useState } from "react";
import { expect } from "storybook/test";
import { Button, Checkbox, Heading, Text, TextInput } from "../index";

const MOBILE_VIEWPORTS = {
  mobile320: {
    name: "Mobile 320",
    styles: { width: "320px", height: "568px" },
    type: "mobile",
  },
};

const PROGRAMS = Array.from({ length: 8 }, (_, index) => ({
  value: String(index + 1),
  label: `Program option ${index + 1}`,
}));

export default {
  title: "Sandbox/Filter sheet options",
  parameters: {
    layout: "fullscreen",
    viewport: { options: MOBILE_VIEWPORTS },
  },
};

function SheetFrame({ children, appliedCount }) {
  return (
    <div className="ink-filter-sheet-sandbox">
      <div className="ink-filter-sheet-sandbox__context">
        <Text size="sm" tone="secondary">Browse programs</Text>
        {appliedCount === undefined ? null : <Text size="sm" aria-live="polite">Applied filters: {appliedCount}</Text>}
      </div>
      <section className="ink-filter-sheet-sandbox__sheet" aria-label="Program filters">
        {children}
      </section>
    </div>
  );
}

function FilterList({ selected, onToggle, query }) {
  const options = useMemo(
    () => PROGRAMS.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="ink-filter-sheet-sandbox__list">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <div className={checked ? "ink-filter-sheet-sandbox__row ink-filter-sheet-sandbox__row--selected" : "ink-filter-sheet-sandbox__row"} key={option.value}>
            <Checkbox label={option.label} checked={checked} onChange={() => onToggle(option.value)} />
          </div>
        );
      })}
    </div>
  );
}

function FilterSheet({ mode }) {
  const [immediateSelection, setImmediateSelection] = useState(["1"]);
  const [draftSelection, setDraftSelection] = useState(["1"]);
  const [appliedSelection, setAppliedSelection] = useState(["1"]);
  const [query, setQuery] = useState("");
  const isStaged = mode === "staged";
  const selected = isStaged ? draftSelection : immediateSelection;
  const setSelected = isStaged ? setDraftSelection : setImmediateSelection;
  const toggle = (value) => setSelected((current) => current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value]);
  const clear = () => setSelected([]);

  return (
    <SheetFrame appliedCount={isStaged ? appliedSelection.length : undefined}>
      <div className="ink-filter-sheet-sandbox__header">
        <div className="ink-filter-sheet-sandbox__heading-row">
          <Heading level={2} size="sm">Programs</Heading>
          {!isStaged ? (
            <Button variant="ghost" size="sm" onClick={clear} disabled={selected.length === 0}>Clear</Button>
          ) : null}
        </div>
        <div className="ink-filter-sheet-sandbox__summary">
          <Text size="sm" tone="secondary">{selected.length} selected</Text>
        </div>
        <TextInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search programs"
          aria-label="Search programs"
        />
      </div>
      <FilterList selected={selected} onToggle={toggle} query={query} />
      {isStaged ? (
        <div className="ink-filter-sheet-sandbox__footer">
          <Button variant="ghost" size="sm" onClick={clear} disabled={selected.length === 0}>Clear</Button>
          <Button size="sm" onClick={() => setAppliedSelection(draftSelection)}>Apply filters</Button>
        </div>
      ) : null}
    </SheetFrame>
  );
}

export const ImmediateSelection = {
  name: "Immediate selection · option 2",
  globals: { viewport: { value: "mobile320", isRotated: false } },
  render: () => <FilterSheet mode="immediate" />,
  play: async ({ canvas, userEvent }) => {
    const secondOption = canvas.getByRole("checkbox", { name: "Program option 2" });
    await userEvent.click(secondOption);
    await expect(secondOption).toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(canvas.getByText("0 selected")).toBeVisible();
    await userEvent.click(canvas.getByRole("checkbox", { name: "Program option 1" }));
  },
};

export const StagedSelection = {
  name: "Staged selection · option 2",
  globals: { viewport: { value: "mobile320", isRotated: false } },
  render: () => <FilterSheet mode="staged" />,
  play: async ({ canvas, userEvent }) => {
    const secondOption = canvas.getByRole("checkbox", { name: "Program option 2" });
    await userEvent.click(secondOption);
    await expect(canvas.getByText("2 selected")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Apply filters" }));
    await expect(canvas.getByText("Applied filters: 2")).toBeVisible();
    await userEvent.click(secondOption);
    await userEvent.click(canvas.getByRole("button", { name: "Apply filters" }));
    await expect(canvas.getByText("Applied filters: 1")).toBeVisible();
  },
};
