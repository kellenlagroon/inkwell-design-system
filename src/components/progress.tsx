import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";

export type ProgressTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand";
export type ProgressSize = "sm" | "md";

function createWavyRingPath(phase = 0): string {
  const points = 120;
  const waves = 10;
  const baseRadius = 43.8;
  const amplitude = 3;
  const center = 50;

  return Array.from({ length: points + 1 }, (_, index) => {
    const angle = ((index / points) * Math.PI * 2) - (Math.PI / 2);
    const radius = baseRadius + (Math.sin((angle * waves) + phase) * amplitude);
    const x = center + (Math.cos(angle) * radius);
    const y = center + (Math.sin(angle) * radius);
    return `${index === 0 ? "M" : "L"}${x.toFixed(3)} ${y.toFixed(3)}`;
  }).join(" ");
}

const WAVY_RING_PATH = createWavyRingPath();
const WAVY_RING_MOTION_PATH = createWavyRingPath(Math.PI / 2);
const WAVY_RING_MOTION_VALUES = `${WAVY_RING_PATH};${WAVY_RING_MOTION_PATH};${WAVY_RING_PATH}`;
const SMOOTH_RING_PATH = "M50 6.2 A43.8 43.8 0 1 1 50 93.8 A43.8 43.8 0 1 1 50 6.2";

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
 * A wavy circular progress ring with rounded caps. Pass `value` for
 * determinate progress; omit it for a smooth, indeterminate animated ring. Exposes `role="progressbar"` with
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
  const strokeDasharray = isDeterminate ? `${percent} ${100 - percent}` : "28 72";
  const showFill = !isDeterminate || percent > 0;
  const ringPath = isDeterminate ? WAVY_RING_PATH : SMOOTH_RING_PATH;

  const classes = [
    "ink-progress",
    tone !== "brand" ? `ink-progress--${tone}` : "",
    size !== "md" ? `ink-progress--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const fillStyle = { strokeDasharray, stroke: "var(--ink-progress-color)" } as CSSProperties;

  return (
    <div id={id} className={classes}>
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
        <svg className="ink-progress-svg" viewBox="0 0 100 100" aria-hidden="true">
          <path className={["ink-progress-track", isDeterminate ? "ink-progress-wavy-path" : ""].filter(Boolean).join(" ")} d={ringPath} pathLength="100">
            {isDeterminate ? <animate className="ink-progress-wavy-path-motion" attributeName="d" values={WAVY_RING_MOTION_VALUES} dur="2200ms" repeatCount="indefinite" /> : null}
          </path>
          {showFill ? (
            <path
              className={["ink-progress-fill", isDeterminate ? "ink-progress-wavy-path" : "", isDeterminate ? "" : "ink-progress-fill--indeterminate"].filter(Boolean).join(" ")}
              d={ringPath}
              pathLength="100"
              style={fillStyle}
            >
              {isDeterminate ? <animate className="ink-progress-wavy-path-motion" attributeName="d" values={WAVY_RING_MOTION_VALUES} dur="2200ms" repeatCount="indefinite" /> : null}
            </path>
          ) : null}
        </svg>
        <span className="ink-progress-value">{formatted ?? ""}</span>
      </div>
      {label != null ? (
        <span id={labelId} className="ink-progress-label">{label}</span>
      ) : null}
    </div>
  );
}
