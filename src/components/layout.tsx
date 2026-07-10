import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/**
 * Layout primitives for Inkwell.
 *
 * Stack / Inline / Grid arrange children with token-backed spacing so consumers
 * stop hand-rolling flexbox and arbitrary gap values. The `gap` scale maps to
 * the same spacing rhythm the source app used — `md` (12px / --space-3) is the
 * default, matching the app's `.stacked-form` / `.grid` layout rhythm.
 *
 * Each primitive renders a `div` with a base class and sets CSS variables inline
 * so the props drive the values while the rules live in the stylesheet.
 */

export type SpaceScale = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const SPACE: Record<SpaceScale, string> = {
  none: "0",
  xs: "var(--space-1)", // 4px
  sm: "var(--space-2)", // 8px
  md: "var(--space-3)", // 12px — default, the app's canonical rhythm
  lg: "var(--space-4)", // 16px
  xl: "var(--space-6)", // 24px
};

export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";
const ALIGN: Record<AlignItems, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

export type JustifyContent = "start" | "center" | "end" | "between" | "around";
const JUSTIFY: Record<JustifyContent, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

function styleVars(base: CSSProperties | undefined, entries: Record<string, string | undefined>): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) vars[key] = value;
  }
  return { ...base, ...vars } as CSSProperties;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Space between children. Defaults to `md` (12px). */
  gap?: SpaceScale;
  /** Cross-axis alignment (`align-items`). */
  align?: AlignItems;
  children?: ReactNode;
}

/** Vertical flow with a consistent, token-backed gap. */
export function Stack({ gap = "md", align, className = "", style, children, ...props }: StackProps) {
  return (
    <div
      className={["ink-stack", className].filter(Boolean).join(" ")}
      style={styleVars(style, { "--ink-stack-gap": SPACE[gap], "--ink-stack-align": align && ALIGN[align] })}
      {...props}
    >
      {children}
    </div>
  );
}

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  /** Space between children. Defaults to `md` (12px). */
  gap?: SpaceScale;
  /** Cross-axis alignment (`align-items`). Defaults to `center`. */
  align?: AlignItems;
  /** Main-axis distribution (`justify-content`). */
  justify?: JustifyContent;
  /** Whether children wrap onto multiple rows. Defaults to `true`. */
  wrap?: boolean;
  children?: ReactNode;
}

/** Horizontal flow with gap, wrapping, and alignment. */
export function Inline({ gap = "md", align, justify, wrap = true, className = "", style, children, ...props }: InlineProps) {
  return (
    <div
      className={["ink-inline", className].filter(Boolean).join(" ")}
      style={styleVars(style, {
        "--ink-inline-gap": SPACE[gap],
        "--ink-inline-align": align && ALIGN[align],
        "--ink-inline-justify": justify && JUSTIFY[justify],
        "--ink-inline-wrap": wrap ? "wrap" : "nowrap",
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Space between cells. Defaults to `md` (12px). */
  gap?: SpaceScale;
  /** Number of equal columns (`repeat(n, minmax(0, 1fr))`). Defaults to 2. */
  columns?: number;
  /** Cross-axis alignment (`align-items`). */
  align?: AlignItems;
  children?: ReactNode;
}

/** Equal-column grid using the app's `repeat(n, minmax(0, 1fr))` convention. */
export function Grid({ gap = "md", columns = 2, align, className = "", style, children, ...props }: GridProps) {
  return (
    <div
      className={["ink-grid", className].filter(Boolean).join(" ")}
      style={styleVars(style, {
        "--ink-grid-gap": SPACE[gap],
        "--ink-grid-columns": `repeat(${columns}, minmax(0, 1fr))`,
        "--ink-grid-align": align && ALIGN[align],
      })}
      {...props}
    >
      {children}
    </div>
  );
}
