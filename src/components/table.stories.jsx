import { useMemo, useState } from "react";
import { Table } from "./table";

export default {
  title: "Components/Table",
};

const ITEMS = [
  { id: "northstar", item: "Northstar", group: "Core", open: 12, closed: 1 },
  { id: "summit", item: "Summit", group: "Core", open: 11, closed: 2 },
  { id: "harbor", item: "Harbor", group: "Growth", open: 11, closed: 2 },
  { id: "cedar", item: "Cedar", group: "Growth", open: 10, closed: 3 },
  { id: "atlas", item: "Atlas", group: "Platform", open: 10, closed: 3 },
];

export const Playground = {
  args: {
    density: "comfortable",
    hoverable: true,
    stickyHeader: false,
  },
  argTypes: {
    density: { control: "inline-radio", options: ["comfortable", "compact"] },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
  render: ({ density, hoverable, stickyHeader }) => {
    const [sortBy, setSortBy] = useState("open");
    const [direction, setDirection] = useState("desc");
    const data = useMemo(() => {
      const sorted = [...ITEMS];
      sorted.sort((a, b) => {
        const av = a[sortBy], bv = b[sortBy];
        const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
        return direction === "asc" ? cmp : -cmp;
      });
      return sorted;
    }, [sortBy, direction]);

    return (
      <div style={{ padding: 24, maxWidth: 640, color: "var(--color-text-primary)" }}>
        <Table
          columns={[
            { id: "item", header: "Project", sortable: true, render: (r) => r.item },
            { id: "group", header: "Group", sortable: true, render: (r) => r.group },
            { id: "open", header: "Open items", sortable: true, align: "end", render: (r) => r.open },
            { id: "closed", header: "Closed items", sortable: true, align: "end", render: (r) => r.closed },
          ]}
          data={data}
          getRowKey={(r) => r.id}
          sortBy={sortBy}
          sortDirection={direction}
          onSortChange={(id, dir) => { setSortBy(id); setDirection(dir); }}
          density={density}
          hoverable={hoverable}
          stickyHeader={stickyHeader}
        />
      </div>
    );
  },
};
