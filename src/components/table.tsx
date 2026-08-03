import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconArrowDown } from "./icons";

export type TableSortDirection = "asc" | "desc";
export type TableDensity = "comfortable" | "compact";
export type TableAlign = "start" | "center" | "end";
/** CSS properties plus the Table's scoped visual customization variables. */
export type TableStyle = CSSProperties & Record<`--ink-table-${string}`, string | number | undefined>;

export interface TableColumn<T> {
  /** Stable id used for sort state and React keys. */
  id: string;
  /** Header cell content. */
  header: ReactNode;
  /** Renders the body cell for a row. */
  render: (row: T) => ReactNode;
  /** Show the sort affordance on the header; clicks call `onSortChange`. */
  sortable?: boolean;
  /** Text alignment for this column's cells and header. Defaults to "start". */
  align?: TableAlign;
  /** Optional width, applied via `<colgroup>` (e.g. "12ch", "20%"). */
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: readonly T[];
  /** Stable React key for each row. */
  getRowKey: (row: T) => string | number;
  /** Controlled sort column id. */
  sortBy?: string;
  /** Controlled sort direction. */
  sortDirection?: TableSortDirection;
  /** Called when a sortable header is activated. */
  onSortChange?: (sortBy: string, direction: TableSortDirection) => void;
  /** Uncontrolled starting sort column. */
  defaultSortBy?: string;
  /** Uncontrolled starting sort direction. Defaults to "asc". */
  defaultSortDirection?: TableSortDirection;
  /** Row height / padding. Defaults to "comfortable". */
  density?: TableDensity;
  /** Pin `<thead>` when the parent scrolls. */
  stickyHeader?: boolean;
  /** Subtle hover fill on rows. */
  hoverable?: boolean;
  /** Renders as `<caption>`. */
  caption?: ReactNode;
  /** Empty-state content shown when `data` is empty. */
  empty?: ReactNode;
  /** Scoped visual customization, including `--ink-table-*` CSS variables. */
  style?: TableStyle;
  id?: string;
  className?: string;
  /**
   * Accessible name for the horizontal scroll region. Only announced when the
   * table actually overflows. Defaults to the `caption` when it's a string.
   */
  scrollAreaLabel?: string;
}

/**
 * A semantic HTML table with optional sortable columns, sticky header, row
 * hover, and density presets. Sorting is caller-controlled: the component
 * surfaces the click and shows the indicator, but the data must already be in
 * the desired order (use `onSortChange` to react).
 */
export function Table<T>({
  columns,
  data,
  getRowKey,
  sortBy,
  sortDirection,
  onSortChange,
  defaultSortBy,
  defaultSortDirection = "asc",
  density = "comfortable",
  stickyHeader = false,
  hoverable = false,
  caption,
  empty,
  style,
  id,
  className = "",
  scrollAreaLabel,
}: TableProps<T>) {
  const isControlled = sortBy !== undefined;
  const [internalSort, setInternalSort] = useState<{ by?: string; direction: TableSortDirection }>({
    by: defaultSortBy,
    direction: defaultSortDirection,
  });
  const activeSortBy = isControlled ? sortBy : internalSort.by;
  const activeSortDirection = isControlled ? (sortDirection ?? "asc") : internalSort.direction;

  function toggleSort(columnId: string) {
    const nextDirection: TableSortDirection =
      activeSortBy === columnId && activeSortDirection === "asc" ? "desc" : "asc";
    if (!isControlled) setInternalSort({ by: columnId, direction: nextDirection });
    onSortChange?.(columnId, nextDirection);
  }

  const classes = [
    "ink-table",
    density === "compact" ? "ink-table--compact" : "",
    stickyHeader ? "ink-table--sticky" : "",
    hoverable ? "ink-table--hoverable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedScrollLabel =
    scrollAreaLabel ?? (typeof caption === "string" ? caption : undefined);

  return (
    // A table has no intrinsic maximum width, so without this wrapper a wide
    // table drags the whole page sideways on narrow screens. tabIndex makes the
    // scroll region reachable by keyboard (WCAG 2.1.1); the wrapper is also what
    // `stickyHeader` needs to stick against.
    <div
      className="ink-table-scroll"
      tabIndex={0}
      // A region with no accessible name is invalid, so the role is only
      // applied when there's something to name it with.
      role={resolvedScrollLabel ? "region" : undefined}
      aria-label={resolvedScrollLabel}
    >
    <table id={id} className={classes} style={style}>
      {caption ? <caption className="ink-table-caption">{caption}</caption> : null}
      {columns.some((c) => c.width) ? (
        <colgroup>
          {columns.map((c) => (
            <col key={c.id} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
      ) : null}
      <thead>
        <tr>
          {columns.map((column) => {
            const align = column.align ?? "start";
            const isActive = column.sortable && activeSortBy === column.id;
            const ariaSort = column.sortable
              ? isActive
                ? activeSortDirection === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
              : undefined;
            return (
              <th
                key={column.id}
                scope="col"
                aria-sort={ariaSort}
                data-align={align}
              >
                {column.sortable ? (
                  <button
                    type="button"
                    className="ink-table-sort-button"
                    onClick={() => toggleSort(column.id)}
                  >
                    <span className="ink-table-header-label">{column.header}</span>
                    <IconArrowDown
                      className={[
                        "ink-table-sort-icon",
                        isActive ? "ink-table-sort-icon--active" : "",
                        isActive && activeSortDirection === "asc" ? "ink-table-sort-icon--asc" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <span className="ink-table-header-label">{column.header}</span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="ink-table-empty-row">
            <td colSpan={columns.length}>{empty ?? "No data."}</td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.id} data-align={column.align ?? "start"}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
    </div>
  );
}
