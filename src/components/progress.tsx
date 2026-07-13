import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";

export type ProgressTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand";
export type ProgressSize = "sm" | "md";

export interface ProgressProps {
  /** Current progress (0–100). Omit for an indeterminate bar. */
  value?: number;
  /** Fill color. Defaults to "brand". */
  tone?: ProgressTone;
  /** Ring size. `md` is the default; `sm` renders a compact ring. */
  size?: ProgressSize;
  /** Optional visible label rendered beside the ring. Also becomes the accessible name. */
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
 * A circular progress ring with a drifting striped fill. Pass `value` for
 * determinate progress; omit it for an indeterminate animated ring. Exposes `role="progressbar"` with
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
  const progressDeg = isDeterminate ? (percent / 100) * 360 : 270;

  const classes = [
    "ink-progress",
    tone !== "brand" ? `ink-progress--${tone}` : "",
    size !== "md" ? `ink-progress--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const style = {
    "--ink-progress-deg": `${progressDeg}deg`,
  } as CSSProperties;

  return (
    <div id={id} className={classes} style={style}>
      <div
        className="ink-progress-ring"
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
        />
        <span className="ink-progress-value">{formatted ?? ""}</span>
      </div>
      {label != null ? (
        <span id={labelId} className="ink-progress-label">{label}</span>
      ) : null}
    </div>
  );
}
