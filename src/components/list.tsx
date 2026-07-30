import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ListDensity = "comfortable" | "compact";
export type ListStyle = CSSProperties &
  Record<`--ink-list-${string}`, string | number | undefined>;

export interface ListProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
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
  /** Scoped visual overrides using the `--ink-list-*` CSS variables. */
  style?: ListStyle;
}

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
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
  className = "",
  style: consumerStyle,
  ...props
}: ListProps) {
  const classes = [
    "ink-list",
    density === "compact" ? "ink-list--compact" : "",
    bordered ? "ink-list--bordered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    ...consumerStyle,
    "--ink-list-cols": columns,
  } as ListStyle;

  return (
    <div className={classes} style={style} role="list" {...props}>
      {children}
    </div>
  );
}

/** A row in a `List`. Wraps `children` in a grid using the parent's `columns`. */
List.Row = function ListRow({ children, className = "", ...props }: ListRowProps) {
  return (
    <div role="listitem" className={["ink-list-row", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
};
