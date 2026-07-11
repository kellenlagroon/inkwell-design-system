import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "plain" | "outlined";
export type CardTone = "default" | "danger";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Surface treatment. `plain` (default) is borderless on the raised surface —
   * the app's common look. `outlined` adds a subtle border on the default
   * surface for the rare case that needs a hard edge.
   */
  variant?: CardVariant;
  /** `danger` flags a destructive zone with a danger-soft border. */
  tone?: CardTone;
  children?: ReactNode;
}

/**
 * A padded content surface. Borderless and raised by default (a content-unit
 * sibling to the section-level `Panel`). Compose it with `SectionHeading` for a
 * header and `CardActions` for a footer row.
 */
export function Card({ variant = "plain", tone = "default", className = "", children, ...props }: CardProps) {
  const classes = [
    "card",
    variant === "outlined" ? "card--outlined" : "",
    tone === "danger" ? "card--danger" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** A footer row of actions inside a `Card` — a wrapping, gap-spaced flex row. */
export function CardActions({ className = "", children, ...props }: CardActionsProps) {
  return (
    <div className={["card-actions", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
