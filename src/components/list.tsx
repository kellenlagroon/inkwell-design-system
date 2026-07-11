import type { CSSProperties, ReactNode } from "react";

export type ListDensity = "comfortable" | "compact";

export interface ListProps {
  /**
   * Grid template for row columns (e.g. `"1fr 1fr auto"`,
   * `"minmax(0, 1.1fr) minmax(0, 1fr) auto"`). Applied to every child row via
   * a CSS custom property, so all rows share the same column geometry.
   */
  columns: string;
  /** Row padding preset. Defaults to "comfortable". */
  density?: ListDensity;
  /** Hide the hairline divider between rows. */
  bordered?: boolean;
  children?: ReactNode;
  id?: string;
  className?: string;
}

export interface ListRowProps {
  children?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * A grid-based list of rows. Not a semantic table — use for content that reads
 * tabularly but isn't structured data (e.g. the app's roster). Each row is a
 * grid with the column template set on the parent via `columns`.
 */
export function List({
  columns,
  density = "comfortable",
  bordered = true,
  children,
  id,
  className = "",
}: ListProps) {
  const classes = [
    "ink-list",
    density === "compact" ? "ink-list--compact" : "",
    bordered ? "ink-list--bordered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = { "--ink-list-cols": columns } as CSSProperties;

  return (
    <div id={id} className={classes} style={style} role="list">
      {children}
    </div>
  );
}

/** A row in a `List`. Wraps `children` in a grid using the parent's `columns`. */
List.Row = function ListRow({ children, id, className = "" }: ListRowProps) {
  return (
    <div id={id} role="listitem" className={["ink-list-row", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};
