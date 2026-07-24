import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "plain" | "outlined";
export type CardTone = "default" | "danger";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Surface treatment. `plain` (default) is borderless on the raised surface —
   * the app's common look. `outlined` adds a subtle border on the default
   * surface for the rare case that needs a hard edge.
   */
  variant?: CardVariant;
  /** `danger` flags a destructive zone with a danger-soft border. */
  tone?: CardTone;
  /** Token-backed responsive internal spacing. */
  padding?: CardPadding;
  children?: ReactNode;
}

/**
 * A layout-neutral padded content surface. Borderless and raised by default (a
 * content-unit sibling to the section-level `Panel`). Compose its contents with
 * `Stack`, `SectionHeading`, and `CardActions` as needed.
 */
export function Card({ variant = "plain", tone = "default", padding = "md", className = "", children, ...props }: CardProps) {
  const classes = [
    "card",
    variant === "outlined" ? "card--outlined" : "",
    tone === "danger" ? "card--danger" : "",
    padding !== "md" ? `card--padding-${padding}` : "",
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
