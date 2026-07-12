import { Table } from "./table";

export default {
  title: "Components/Table/Features",
};

const ROWS = [
  { id: "a", name: "Alabama", wins: 12, losses: 1 },
  { id: "b", name: "Georgia", wins: 11, losses: 2 },
  { id: "c", name: "Ohio State", wins: 11, losses: 2 },
];

const COLUMNS = [
  { id: "name", header: "Team", render: (r) => r.name },
  { id: "wins", header: "Wins", align: "end", render: (r) => r.wins },
  { id: "losses", header: "Losses", align: "end", render: (r) => r.losses },
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

export const StickyHeader = {
  name: "Sticky header",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <div style={{ height: 200, overflow: "auto" }}>
        <Table
          columns={COLUMNS}
          data={Array.from({ length: 20 }, (_, i) => ({
            id: `r${i}`,
            name: `Team ${i + 1}`,
            wins: 12 - (i % 5),
            losses: i % 5,
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
