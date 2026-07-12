export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "muted" | "brand" | "current";

export interface SpinnerProps {
  /** Diameter preset. Defaults to "md" (20px). */
  size?: SpinnerSize;
  /** Spinner color. `current` inherits `currentColor`. Defaults to "muted". */
  tone?: SpinnerTone;
  /** Announced by screen readers. Defaults to "Loading". */
  label?: string;
  /** Skip the announcement (use when a surrounding region already announces state). */
  decorative?: boolean;
  id?: string;
  className?: string;
}

/**
 * A small rotating indeterminate loader. Use for short waits inside a control
 * or beside a label. For loading larger regions of content, use `Skeleton`
 * instead so the layout doesn't jump when data arrives.
 */
export function Spinner({
  size = "md",
  tone = "muted",
  label = "Loading",
  decorative = false,
  id,
  className = "",
}: SpinnerProps) {
  const classes = [
    "ink-spinner",
    size !== "md" ? `ink-spinner--${size}` : "",
    tone !== "muted" ? `ink-spinner--${tone}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (decorative) {
    return <span id={id} className={classes} aria-hidden="true" />;
  }
  return (
    <span id={id} className={classes} role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
    </span>
  );
}
