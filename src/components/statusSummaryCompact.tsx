import type { HTMLAttributes, ReactNode } from "react";

export interface StatusSummaryCompactProps extends HTMLAttributes<HTMLDivElement> {
  /** Consumer-composed status items. */
  children?: ReactNode;
}

/**
 * A compact, wrapping layout region for status metadata. Compose its children
 * with existing primitives such as `Inline`, `Pill`, and `Collapsible` to suit
 * the surrounding page rather than imposing a fixed status schema.
 */
export function StatusSummaryCompact({ children, className = "", ...props }: StatusSummaryCompactProps) {
  return (
    <div className={["status-summary-compact", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
