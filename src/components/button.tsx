import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual role in the action hierarchy. */
  variant?: ButtonVariant;
  /** Control height/density. `md` is the default and adds no modifier. */
  size?: ButtonSize;
  children?: ReactNode;
}

/**
 * The primary action control. `variant` selects the visual role and `size`
 * the density; extra `className` values are appended for composition.
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    `${variant}-button`,
    size !== "md" ? `button--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
