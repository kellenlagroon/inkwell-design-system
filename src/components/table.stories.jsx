import { useMemo, useState } from "react";
import { Table } from "./table";

export default {
  title: "Components/Table",
};

const ITEMS = [
  { id: "ala", item: "Northstar", group: "Core", priority: 12, status: 1 },
  { id: "geo", item: "Summit", group: "Core", priority: 11, status: 2 },
  { id: "osu", item: "Harbor", group: "Growth", priority: 11, status: 2 },
  { id: "mich", item: "Cedar", group: "Growth", priority: 10, status: 3 },
  { id: "ore", item: "Atlas", group: "Platform", priority: 10, status: 3 },
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
    const [sortBy, setSortBy] = useState("priority");
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
            { id: "item", header: "Item", sortable: true, render: (r) => r.item },
            { id: "group", header: "Group", sortable: true, render: (r) => r.group },
            { id: "priority", header: "Priority", sortable: true, align: "end", render: (r) => r.priority },
            { id: "status", header: "Status", sortable: true, align: "end", render: (r) => r.status },
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
