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
  /**
   * Make the avatar a button. Wraps it in a `<button>` that brightens the ring
   * on hover/focus, matching the app's account trigger. Provide `onClick`.
   */
  interactive?: boolean;
  /** Click handler when `interactive` is set. */
  onClick?: () => void;
  /** Accessible label for the interactive button. Defaults to `name`. */
  buttonLabel?: string;
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
  interactive = false,
  onClick,
  buttonLabel,
  id,
  className = "",
}: AvatarProps) {
  const avatarClasses = [
    "ink-avatar",
    size !== "md" ? `ink-avatar--${size}` : "",
    shape === "square" ? "ink-avatar--square" : "",
    !interactive ? className : "",
  ]
    .filter(Boolean)
    .join(" ");

  const initials = name ? getInitials(name) : "";
  const label = alt ?? name;

  let body: ReactNode;
  if (src) {
    body = <img className="ink-avatar-image" src={src} alt={decorative || interactive ? "" : label ?? ""} />;
  } else if (children != null) {
    body = children;
  } else {
    // Wrapping initials lets us optically center them without shifting images.
    body = <span className="ink-avatar-initials">{initials}</span>;
  }

  // The <img> or the interactive button carries the accessible name, so only
  // the plain initials/children path needs a role/label on the wrapper.
  const labelProps =
    decorative || interactive || src
      ? { "aria-hidden": decorative || undefined }
      : label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true };

  const avatar = (
    <span id={interactive ? undefined : id} className={avatarClasses} {...labelProps}>
      {body}
    </span>
  );

  if (!interactive) return avatar;

  return (
    <button
      type="button"
      id={id}
      className={["ink-avatar-button", className].filter(Boolean).join(" ")}
      aria-label={buttonLabel ?? label ?? "Account"}
      onClick={onClick}
    >
      {avatar}
    </button>
  );
}
