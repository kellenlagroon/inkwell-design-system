import { useMemo, useState } from "react";
import { Table } from "./table";

export default {
  title: "Components/Table",
};

const TEAMS = [
  { id: "ala", team: "Alabama", conf: "SEC", wins: 12, losses: 1 },
  { id: "geo", team: "Georgia", conf: "SEC", wins: 11, losses: 2 },
  { id: "osu", team: "Ohio State", conf: "B1G", wins: 11, losses: 2 },
  { id: "mich", team: "Michigan", conf: "B1G", wins: 10, losses: 3 },
  { id: "ore", team: "Oregon", conf: "PAC", wins: 10, losses: 3 },
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
    const [sortBy, setSortBy] = useState("wins");
    const [direction, setDirection] = useState("desc");
    const data = useMemo(() => {
      const sorted = [...TEAMS];
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
            { id: "team", header: "Team", sortable: true, render: (r) => r.team },
            { id: "conf", header: "Conf", sortable: true, render: (r) => r.conf },
            { id: "wins", header: "W", sortable: true, align: "end", render: (r) => r.wins },
            { id: "losses", header: "L", sortable: true, align: "end", render: (r) => r.losses },
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
