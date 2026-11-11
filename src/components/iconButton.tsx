import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "sm" | "md";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon element to render. */
  icon?: ReactNode;
  /** Control size. `md` is 44 px and `sm` is 36 px. Coarse pointers use at least 44 px. */
  size?: IconButtonSize;
}

/**
 * A square, icon-only button. Provide an accessible name via `aria-label`.
 */
export function IconButton({ icon, size = "md", className = "", type = "button", ...props }: IconButtonProps) {
  const sizeClass = size === "sm" ? "icon-btn--sm" : "";
  const classes = ["icon-btn", sizeClass, className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} {...props}>
      {icon}
    </button>
  );
}
