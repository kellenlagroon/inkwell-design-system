import { createElement } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type CardVariant = "plain" | "outlined";
export type CardTone = "default" | "danger";
export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardAppearance {
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
  /** Use the selection tint and border. Put selection semantics on the controlling element. */
  selected?: boolean;
  children?: ReactNode;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardAppearance {
  as?: "div";
}

export interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CardAppearance {
  /** Make the entire card a native button. Keep its contents non-interactive. */
  as: "button";
}

/**
 * A layout-neutral padded content surface. Borderless and raised by default (a
 * content-unit sibling to the section-level `Panel`). Compose its contents with
 * `Stack`, `SectionHeading`, and `CardActions` as needed.
 */
export function Card(props: CardProps | CardButtonProps) {
  const { as = "div", variant = "plain", tone = "default", padding = "md", selected = false, className = "", ...elementProps } = props;
  const classes = [
    "card",
    as === "button" ? "card--button" : "",
    variant === "outlined" ? "card--outlined" : "",
    tone === "danger" ? "card--danger" : "",
    selected ? "card--selected" : "",
    padding !== "md" ? `card--padding-${padding}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return createElement(as, {
    ...elementProps,
    className: classes,
    ...(props.as === "button" && { type: props.type ?? "button" }),
  });
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
