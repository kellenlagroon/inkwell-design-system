import type { HTMLAttributes, ReactNode } from "react";

export type PillTone = "default" | "success" | "warning" | "danger";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. `default` is neutral and adds no modifier. */
  tone?: PillTone;
  children?: ReactNode;
}

/**
 * A small status/label chip. Use `tone` to signal state; keep the label short.
 */
export function Pill({ tone = "default", children, className = "", ...props }: PillProps) {
  const classes = ["pill", tone !== "default" ? tone : "", className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
