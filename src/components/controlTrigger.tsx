import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ControlDensity } from "./controlDensity";

export type { ControlDensity } from "./controlDensity";

export interface ControlTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value"> {
  /** Optional leading icon or filter affordance. */
  leading?: ReactNode;
  /** Primary field label, shown before the value when provided. */
  label?: ReactNode;
  /** Selected value or placeholder content. */
  value?: ReactNode;
  /** Optional selected-count or status badge. */
  count?: ReactNode;
  /** Trailing affordance; defaults to the system chevron. */
  trailing?: ReactNode;
  /** Shared control density. */
  density?: ControlDensity;
  /** Invalid state styling. */
  invalid?: boolean;
  children?: ReactNode;
}

/** Shared trigger foundation for selects, filters, popovers, and picker controls. */
export const ControlTrigger = forwardRef<HTMLButtonElement, ControlTriggerProps>(function ControlTrigger(
  {
    leading,
    label,
    value,
    count,
    trailing,
    density,
    invalid = false,
    className = "",
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const content = children ?? value;
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={["ink-control-trigger", invalid ? "ink-control-trigger--invalid" : "", density && density !== "default" ? `ink-control-density--${density}` : "", className].filter(Boolean).join(" ")}
      aria-invalid={invalid || undefined}
    >
      {leading ? <span className="ink-control-trigger__leading" aria-hidden="true">{leading}</span> : null}
      <span className="ink-control-trigger__content">
        {label ? <span className="ink-control-trigger__label">{label}</span> : null}
        <span className="ink-control-trigger__value">{content}</span>
      </span>
      {count !== undefined && count !== null ? <span className="ink-control-trigger__count">{count}</span> : null}
      <span className="ink-control-trigger__trailing" aria-hidden="true">{trailing ?? <span className="ink-control-trigger__chevron" />}</span>
    </button>
  );
});
