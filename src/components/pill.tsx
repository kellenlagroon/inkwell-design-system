import type { HTMLAttributes, ReactNode } from "react";

export type PillTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. `neutral` is the default and adds no modifier. */
  tone?: PillTone;
  children?: ReactNode;
}

/**
 * A small status/label chip. Use `tone` to signal state; keep the label short.
 */
export function Pill({ tone = "neutral", children, className = "", ...props }: PillProps) {
  const classes = ["pill", tone !== "neutral" ? tone : "", className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
