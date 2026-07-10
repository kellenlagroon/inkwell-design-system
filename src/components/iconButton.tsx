import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon element to render. */
  icon?: ReactNode;
  /** Control size. `md` is the default and adds no modifier. */
  size?: IconButtonSize;
}

/**
 * A square, icon-only button. Provide an accessible name via `aria-label`.
 */
export function IconButton({ icon, size = "md", className = "", type = "button", ...props }: IconButtonProps) {
  const sizeClass = size === "sm" ? "icon-btn--sm" : size === "lg" ? "icon-btn--lg" : "";
  const classes = ["icon-btn", sizeClass, className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} {...props}>
      {icon}
    </button>
  );
}
