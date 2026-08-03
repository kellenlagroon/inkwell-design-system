import type { HTMLAttributes, ReactNode } from "react";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** Direction of the rule. Vertical needs a flex/grid parent to take height. */
  orientation?: "horizontal" | "vertical";
  /** Optional centered label (horizontal only), e.g. "or". */
  label?: ReactNode;
}

/**
 * A thin rule that separates content. Horizontal by default (a native `<hr>`);
 * pass `orientation="vertical"` for an inline rule, or `label` for a labeled
 * separator with the text centered between two lines. Uses the app's hairline
 * (`--line-soft`) and carries no margins — space it with layout primitives.
 */
export function Divider({ orientation = "horizontal", label, className = "", ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={["ink-divider", "ink-divider--vertical", className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

  if (label != null) {
    return (
      <div role="separator" aria-orientation="horizontal" className={["ink-divider", "ink-divider--labeled", className].filter(Boolean).join(" ")} {...props}>
        <span className="ink-divider-label">{label}</span>
      </div>
    );
  }

  return <hr className={["ink-divider", className].filter(Boolean).join(" ")} {...props} />;
}
