import type { ReactNode } from "react";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

export interface AvatarProps {
  /** Person/entity name. Drives the initials fallback and the accessible label. */
  name?: string;
  /** Image URL. When set (and it loads), shows the image instead of initials. */
  src?: string;
  /** Alt text for the image. Defaults to `name`. */
  alt?: string;
  /** Size preset. Defaults to "md" (matches the app's 34px avatar). */
  size?: AvatarSize;
  /** Circle (default) or square with a soft corner. */
  shape?: AvatarShape;
  /** Custom fallback (e.g. an icon) shown when there's no image. Overrides initials. */
  children?: ReactNode;
  /** Hide from assistive tech — use when the name is already shown adjacently. */
  decorative?: boolean;
  id?: string;
  className?: string;
}

/** Up to two uppercase initials from a name. */
function getInitials(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * A compact circular (or square) identity mark showing an image or an initials
 * fallback. Seeded from the app's account avatar. When `decorative` isn't set it
 * exposes an accessible name (the image `alt`/`name`, or `role="img"` +
 * `aria-label` for the initials fallback).
 */
export function Avatar({
  name,
  src,
  alt,
  size = "md",
  shape = "circle",
  children,
  decorative = false,
  id,
  className = "",
}: AvatarProps) {
  const classes = [
    "ink-avatar",
    size !== "md" ? `ink-avatar--${size}` : "",
    shape === "square" ? "ink-avatar--square" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const initials = name ? getInitials(name) : "";
  const label = alt ?? name;

  let body: ReactNode;
  if (src) {
    body = <img className="ink-avatar-image" src={src} alt={decorative ? "" : label ?? ""} />;
  } else if (children != null) {
    body = children;
  } else {
    body = initials;
  }

  // The <img> carries its own alt, so only the initials/children path needs a
  // role/label to be announced.
  const labelProps =
    decorative || src
      ? { "aria-hidden": decorative || undefined }
      : label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true };

  return (
    <span id={id} className={classes} {...labelProps}>
      {body}
    </span>
  );
}
