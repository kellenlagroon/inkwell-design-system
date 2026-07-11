import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "brand" | "neutral" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color tone. Defaults to `brand` (the notification color). */
  tone?: BadgeTone;
  /**
   * Render a bare dot with no content — a presence indicator (generalizes the
   * app's nav notification dot). Provide an `aria-label` if it's meaningful, or
   * `aria-hidden` if it's purely decorative.
   */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * A compact count / notification indicator. Show a small count or short label,
 * or set `dot` for a bare indicator. For inline status labels use `Pill`
 * instead.
 */
export function Badge({ tone = "brand", dot = false, className = "", children, ...props }: BadgeProps) {
  const classes = [
    "badge",
    dot ? "badge--dot" : "",
    tone !== "brand" ? `badge--${tone}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={classes} {...props}>
      {dot ? null : children}
    </span>
  );
}
