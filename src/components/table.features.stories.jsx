import { Table } from "./table";

export default {
  title: "Components/Table/Features",
};

const ROWS = [
  { id: "a", name: "Northstar", priority: 12, status: 1 },
  { id: "b", name: "Summit", priority: 11, status: 2 },
  { id: "c", name: "Harbor", priority: 11, status: 2 },
];

const COLUMNS = [
  { id: "name", header: "Item", render: (r) => r.name },
  { id: "priority", header: "Wins", align: "end", render: (r) => r.priority },
  { id: "status", header: "Losses", align: "end", render: (r) => r.status },
];

export const Basic = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table columns={COLUMNS} data={ROWS} getRowKey={(r) => r.id} />
    </div>
  ),
};

export const Sortable = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table
        columns={COLUMNS.map((c) => ({ ...c, sortable: true }))}
        data={ROWS}
        getRowKey={(r) => r.id}
        defaultSortBy="wins"
        defaultSortDirection="desc"
        hoverable
      />
    </div>
  ),
};

export const Compact = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table columns={COLUMNS} data={ROWS} getRowKey={(r) => r.id} density="compact" />
    </div>
  ),
};

export const CustomStyling = {
  name: "Custom styling",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table
        columns={COLUMNS}
        data={ROWS}
        getRowKey={(r) => r.id}
        hoverable
        style={{
          "--ink-table-header-background": "var(--color-surface-active)",
          "--ink-table-header-color": "var(--color-text-primary)",
          "--ink-table-row-border-color": "var(--color-border-strong)",
          "--ink-table-cell-border-inline-width": "1px",
          "--ink-table-cell-border-inline-color": "var(--color-border-subtle)",
          "--ink-table-outer-border-width": "1px",
          "--ink-table-outer-border-color": "var(--color-border-strong)",
        }}
      />
    </div>
  ),
};

export const StickyHeader = {
  name: "Sticky header",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <div style={{ height: 200, overflow: "auto" }}>
        <Table
          columns={COLUMNS}
          data={Array.from({ length: 20 }, (_, i) => ({
            id: `r${i}`,
            name: `Item ${i + 1}`,
            priority: 12 - (i % 5),
            status: i % 5,
          }))}
          getRowKey={(r) => r.id}
          stickyHeader
          hoverable
        />
      </div>
    </div>
  ),
};

export const Empty = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table columns={COLUMNS} data={[]} getRowKey={(r) => r.id} empty="No teams yet." />
    </div>
  ),
};

export const WithCaption = {
  name: "Caption",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <Table columns={COLUMNS} data={ROWS} getRowKey={(r) => r.id} caption="Top 3 by record" />
    </div>
  ),
};
