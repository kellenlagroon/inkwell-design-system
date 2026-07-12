import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Table } from "./table";
import type { TableColumn } from "./table";

interface Row { id: string; name: string; wins: number }

const ROWS: Row[] = [
  { id: "a", name: "Alabama", wins: 12 },
  { id: "b", name: "Georgia", wins: 11 },
];

const COLUMNS: TableColumn<Row>[] = [
  { id: "name", header: "Team", render: (r) => r.name },
  { id: "wins", header: "Wins", render: (r) => r.wins, sortable: true, align: "end" },
];

describe("Table", () => {
  it("renders a semantic table with headers and rows", () => {
    const { container, getByRole } = render(
      <Table columns={COLUMNS} data={ROWS} getRowKey={(r) => r.id} />,
    );
    expect(getByRole("table")).toBeTruthy();
    expect(container.querySelectorAll("thead th").length).toBe(2);
    expect(container.querySelectorAll("tbody tr").length).toBe(2);
    // scope="col" for a11y
    expect(container.querySelector("thead th")!.getAttribute("scope")).toBe("col");
  });

  it("renders an empty state when data is empty", () => {
    const { container, getByText } = render(
      <Table columns={COLUMNS} data={[]} getRowKey={(r) => r.id} empty="Nothing here." />,
    );
    expect(getByText("Nothing here.")).toBeTruthy();
    // colspan matches column count so it visually spans
    expect(container.querySelector("tbody td")!.getAttribute("colspan")).toBe("2");
  });

  it("sets aria-sort and toggles direction when a sortable header is clicked", () => {
    const onSortChange = vi.fn();
    const { container } = render(
      <Table
        columns={COLUMNS}
        data={ROWS}
        getRowKey={(r) => r.id}
        defaultSortBy="wins"
        defaultSortDirection="asc"
        onSortChange={onSortChange}
      />,
    );
    const winsHeader = container.querySelectorAll("thead th")[1]!;
    expect(winsHeader.getAttribute("aria-sort")).toBe("ascending");

    fireEvent.click(winsHeader.querySelector("button")!);
    expect(onSortChange).toHaveBeenCalledWith("wins", "desc");
    // uncontrolled: internal state flipped
    expect(winsHeader.getAttribute("aria-sort")).toBe("descending");
  });

  it("does not render a sort button for non-sortable columns", () => {
    const { container } = render(
      <Table columns={COLUMNS} data={ROWS} getRowKey={(r) => r.id} />,
    );
    const teamHeader = container.querySelectorAll("thead th")[0]!;
    expect(teamHeader.querySelector("button")).toBeNull();
    expect(teamHeader.getAttribute("aria-sort")).toBeNull();
  });

  it("applies density, sticky, and hoverable modifiers", () => {
    const { container } = render(
      <Table
        columns={COLUMNS}
        data={ROWS}
        getRowKey={(r) => r.id}
        density="compact"
        stickyHeader
        hoverable
      />,
    );
    const table = container.querySelector(".ink-table")!;
    expect(table.classList.contains("ink-table--compact")).toBe(true);
    expect(table.classList.contains("ink-table--sticky")).toBe(true);
    expect(table.classList.contains("ink-table--hoverable")).toBe(true);
  });
});
