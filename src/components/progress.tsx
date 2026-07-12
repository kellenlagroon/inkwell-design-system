import { useId } from "react";
import type { ReactNode } from "react";

export type ProgressTone = "brand" | "success" | "danger";
export type ProgressSize = "sm" | "md";

export interface ProgressProps {
  /** Current progress (0–100). Omit for an indeterminate bar. */
  value?: number;
  /** Fill color. Defaults to "brand". */
  tone?: ProgressTone;
  /** Track height. `md` (default) ≈ 6px; `sm` ≈ 3px. */
  size?: ProgressSize;
  /** Optional visible label rendered above the track. Also becomes the accessible name. */
  label?: ReactNode;
  /** Value formatter shown next to the label (determinate only). Defaults to `${value}%`. */
  valueFormatter?: (value: number) => string;
  /** Fallback accessible name when `label` isn't set. */
  ariaLabel?: string;
  id?: string;
  className?: string;
}

/** Clamp a raw value into the 0–100 range and round to a whole percent. */
function clamp(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.round(Math.min(100, Math.max(0, value)));
}

/**
 * A horizontal progress bar. Pass `value` for determinate progress; omit it for
 * an indeterminate sliding-bar animation. Exposes `role="progressbar"` with
 * `aria-valuemin/max/now` (or `aria-valuetext="indeterminate"` when unknown).
 */
export function Progress({
  value,
  tone = "brand",
  size = "md",
  label,
  valueFormatter,
  ariaLabel,
  id,
  className = "",
}: ProgressProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const labelId = label != null ? `${baseId}-label` : undefined;

  const isDeterminate = typeof value === "number";
  const percent = isDeterminate ? clamp(value) : 0;
  const formatted = isDeterminate ? (valueFormatter ?? ((v) => `${v}%`))(percent) : null;

  const classes = [
    "ink-progress",
    tone !== "brand" ? `ink-progress--${tone}` : "",
    size !== "md" ? `ink-progress--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id={id} className={classes}>
      {label != null ? (
        <div className="ink-progress-heading">
          <span id={labelId} className="ink-progress-label">{label}</span>
          {formatted != null ? <span className="ink-progress-value">{formatted}</span> : null}
        </div>
      ) : null}
      <div
        className="ink-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isDeterminate ? percent : undefined}
        aria-valuetext={isDeterminate ? undefined : "indeterminate"}
        aria-labelledby={labelId}
        aria-label={labelId ? undefined : ariaLabel}
      >
        <div
          className={["ink-progress-fill", isDeterminate ? "" : "ink-progress-fill--indeterminate"].filter(Boolean).join(" ")}
          style={isDeterminate ? { transform: `scaleX(${percent / 100})` } : undefined}
        />
      </div>
    </div>
  );
}
