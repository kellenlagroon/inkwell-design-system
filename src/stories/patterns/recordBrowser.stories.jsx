import { useRef, useState } from "react";
import {
  ActionGroup, Badge, Button, ButtonLink, Card, Checkbox, Drawer, FileUpload, FormField,
  Heading, Inline, Nav, Pagination, Panel, Pill, Popover, Select, Stack, Surface,
  Text, Textarea, TextInput,
} from "../../index";
import "./recordBrowser.css";

const sections = [
  { value: "records", label: "Records" },
  { value: "activity", label: "Activity" },
];
const switchBorders = {
  "--ink-nav-track-border": "transparent",
  "--ink-nav-slider-border": "transparent",
};
const statuses = [
  { value: "review", label: "In review" },
  { value: "ready", label: "Ready for the next scheduled review" },
  { value: "draft", label: "Draft" },
];
const records = [
  { id: "guide", title: "Contributor guide", team: "Documentation", updated: "Today", notes: 4, flagged: true, status: "review" },
  { id: "checklist", title: "Accessibility checklist", team: "Research", updated: "Yesterday", notes: 2, flagged: false, status: "ready" },
  { id: "inventory", title: "Content inventory", team: "Operations", updated: "Monday", notes: 1, flagged: true, status: "draft" },
  { id: "brief", title: "Workshop brief", team: "Research", updated: "Tuesday", notes: 3, flagged: false, status: "draft" },
  { id: "notes", title: "Release notes", team: "Documentation", updated: "Monday", notes: 5, flagged: false, status: "ready" },
  { id: "plan", title: "Research plan", team: "Research", updated: "Friday", notes: 1, flagged: true, status: "review" },
];

function RecordBrowser() {
  const [section, setSection] = useState("records");
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(records[0].id);
  const [showDetail, setShowDetail] = useState(false);
  const [saved, setSaved] = useState([records[0].id]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [researchOnly, setResearchOnly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edits, setEdits] = useState({});
  const [draft, setDraft] = useState({ status: "review", note: "" });
  const filtersTrigger = useRef(null);

  const filtered = records.filter((record) =>
    record.title.toLowerCase().includes(query.trim().toLowerCase()) &&
    (!researchOnly || record.team === "Research") &&
    (view === "all" || (view === "flagged" ? record.flagged : saved.includes(record.id))),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / 3));
  const currentPage = Math.min(page, pageCount);
  const visibleRecords = filtered.slice((currentPage - 1) * 3, currentPage * 3);
  const current = visibleRecords.find(({ id }) => id === selected) ?? visibleRecords[0];
  const details = current && (edits[current.id] ?? { status: current.status, note: "" });

  function finishFilters() {
    setFiltersOpen(false);
    filtersTrigger.current?.focus();
  }

  return (
    <div className="record-browser">
      <header className="record-browser-header">
        <Heading level={1}>Workspace</Heading>
        <Nav
          shape="pill"
          items={sections}
          value={section}
          onChange={setSection}
          aria-label="Workspace sections"
          style={{ ...switchBorders, "--ink-nav-track-background": "var(--record-browser-header-switch-bg)" }}
        />
      </header>
      {section === "activity" ? (
        <Panel aria-label="Activity">
          <Heading>Activity</Heading>
          <Text tone="secondary">Contributor guide was updated today.</Text>
        </Panel>
      ) : (
        <main className="record-browser-content">
          <div className="record-browser-panes" data-show-detail={showDetail}>
            <Panel className="record-browser-list" aria-label="Records">
              <Stack>
                <Nav
                  fit="equal"
                  items={[
                    { value: "all", label: "All" },
                    { value: "flagged", label: "Flagged", badge: records.filter(({ flagged }) => flagged).length },
                    { value: "saved", label: "Saved" },
                  ]}
                  value={view}
                  onChange={(value) => { setView(value); setPage(1); }}
                  aria-label="Record views"
                  style={{ ...switchBorders, "--ink-nav-track-background": "var(--color-surface-active)" }}
                />
                <div className="record-browser-filters">
                  <TextInput type="search" aria-label="Search records" placeholder="Search records" value={query} onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }} />
                  <Popover
                    ariaLabel="Record filters"
                    dialog
                    mobileSheet
                    placement="bottom-end"
                    open={filtersOpen}
                    onOpenChange={setFiltersOpen}
                    trigger={({ ref, open, onToggle, ...trigger }) => (
                      <Button
                        {...trigger}
                        ref={(node) => { ref(node); filtersTrigger.current = node; }}
                        variant="secondary"
                        onClick={onToggle}
                        aria-label={researchOnly ? "Filters, 1 applied" : undefined}
                      >
                        Filters
                        {researchOnly && <Badge aria-hidden="true">1</Badge>}
                      </Button>
                    )}
                  >
                    <div className="ink-popover-mobile-sheet__body">
                      <Heading level={2} size="sm">Filter records</Heading>
                      <Checkbox label="Research team" checked={researchOnly} onChange={(event) => {
                        setResearchOnly(event.target.checked);
                        setPage(1);
                      }} />
                    </div>
                    <div className="ink-popover-mobile-sheet__footer">
                      <ActionGroup align="end" stackBelow="never">
                        <Button size="sm" variant="ghost" disabled={!researchOnly} onClick={() => setResearchOnly(false)}>Reset</Button>
                        <Button size="sm" onClick={finishFilters}>Done</Button>
                      </ActionGroup>
                    </div>
                  </Popover>
                </div>
                {researchOnly && <Inline><Pill>Research team</Pill></Inline>}
              </Stack>
              <Stack className="record-browser-results" gap="sm">
                <Text size="sm" tone="secondary" role="status">{filtered.length} records</Text>
                {visibleRecords.map((record) => (
                  <Card
                    key={record.id}
                    as="button"
                    className="record-browser-row"
                    variant="outlined"
                    selected={record.id === current?.id}
                    aria-current={record.id === current?.id ? "true" : undefined}
                    padding="sm"
                    onClick={() => {
                      setSelected(record.id);
                      setShowDetail(true);
                    }}
                  >
                    <span className="record-browser-row-heading">
                      <Text as="span" tone="strong">{record.title}</Text>
                      <Badge aria-label={`${record.notes} notes`}>{record.notes}</Badge>
                    </span>
                    <Text as="span" tone="secondary" size="sm">{record.team} · Updated {record.updated.toLowerCase()}</Text>
                  </Card>
                ))}
                {filtered.length === 0 && <Text>No matching records.</Text>}
              </Stack>
              <Pagination compact page={currentPage} pageCount={pageCount} onPageChange={(next) => {
                setPage(next);
                setSelected(filtered[(next - 1) * 3].id);
              }} />
            </Panel>
            <Panel className="record-browser-detail" aria-label="Record detail">
              <Stack gap="lg">
                <Button size="sm" variant="ghost" className="record-browser-back" onClick={() => setShowDetail(false)}>Back to records</Button>
                {current ? (
                  <>
                    <Stack gap="sm">
                      <Heading size="lg">{current.title}</Heading>
                      <Text tone="secondary">{current.team} · Updated {current.updated.toLowerCase()}</Text>
                      <ActionGroup align="start">
                        <Button onClick={() => { setDraft(details); setDrawerOpen(true); }}>Edit record</Button>
                        <Button variant="secondary" aria-pressed={saved.includes(current.id)} onClick={() => {
                          setSaved((previous) => previous.includes(current.id) ? previous.filter((id) => id !== current.id) : [...previous, current.id]);
                        }}>{saved.includes(current.id) ? "Saved" : "Save"}</Button>
                        <ButtonLink href="#record-summary" variant="ghost">View summary</ButtonLink>
                      </ActionGroup>
                    </Stack>
                    <Surface tone="muted" id="record-summary">
                      <Stack gap="sm">
                        <Heading level={3} size="sm">Review summary</Heading>
                        <Text>{details.note || "Confirm the next review date and add any outstanding questions for the team."}</Text>
                      </Stack>
                    </Surface>
                  </>
                ) : <Text>Select a record to see its details.</Text>}
              </Stack>
            </Panel>
          </div>
        </main>
      )}
      <Drawer
        title="Edit record and review information"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        footer={
          <ActionGroup stackBelow="never">
            <Button variant="ghost" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => setDraft(details)}>Reset changes</Button>
            <Button onClick={() => {
              setEdits((previous) => ({ ...previous, [current.id]: draft }));
              setDrawerOpen(false);
            }}>Save and return to the workspace</Button>
          </ActionGroup>
        }
      >
        <Card variant="outlined">
          <Stack>
            <Heading level={3} size="sm">Review details</Heading>
            <FormField label="Review status">
              <Select options={statuses} value={draft.status} onChange={(status) => setDraft({ ...draft, status })} />
            </FormField>
            <FormField label="Notes">
              <Textarea rows={3} value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} />
            </FormField>
            <FormField label="Reference file">
              <FileUpload triggerSize="sm" />
            </FormField>
          </Stack>
        </Card>
      </Drawer>
    </div>
  );
}

export default { title: "Patterns/Record Browser", parameters: { layout: "fullscreen" } };

export const TwoPane = { render: () => <RecordBrowser /> };
