import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Spinner } from "./spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonSpinnerPlacement = "start" | "end";

interface ButtonOwnProps {
  /** Visual role in the action hierarchy. */
  variant?: ButtonVariant;
  /** Control height/density. Every size has an explicit height, padding, gap, and type size. */
  size?: ButtonSize;
  /** Render a spinner and lock the action while work is in progress. */
  loading?: boolean;
  /** Accessible label announced while loading. Falls back to the button text. */
  loadingLabel?: string;
  /** Whether the spinner appears before or after the label. */
  spinnerPlacement?: ButtonSpinnerPlacement;
  /** Stretch the action to the width of its container. Useful for narrow layouts. */
  fullWidth?: boolean;
  children?: ReactNode;
}

export type ButtonAsButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

export type ButtonAsAnchorProps = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    disabled?: boolean;
  };

export type ButtonLinkProps = Omit<ButtonAsAnchorProps, "as">;

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

/**
 * The primary action control. `variant` selects the visual role and `size`
 * the density. Use `as="a"` for link-backed actions that should retain button
 * styling.
 */
export function Button({
  as,
  variant = "primary",
  size = "md",
  className = "",
  children,
  loading = false,
  loadingLabel,
  spinnerPlacement = "start",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const isAnchor = as === "a";
  const disabled = Boolean(props.disabled || loading);
  const classes = [
    `${variant}-button`,
    `button--${size}`,
    loading ? "button--loading" : "",
    fullWidth ? "button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const spinner = loading ? <Spinner size="sm" tone="current" label={loadingLabel ?? "Loading"} decorative /> : null;
  const inner = (
    <>
      {spinnerPlacement === "start" ? spinner : null}
      <span className="button-content">
        <span className={loading && loadingLabel ? "button-label button-label--hidden" : "button-label"}>{children}</span>
        {loading && loadingLabel ? <span className="button-loading-label">{loadingLabel}</span> : null}
      </span>
      {spinnerPlacement === "end" ? spinner : null}
    </>
  );

  if (isAnchor) {
    const {
      disabled: _disabled,
      onClick,
      target,
      rel,
      ...anchorProps
    } = props as ButtonAsAnchorProps;
    const externalRel = target === "_blank" ? ["noopener", "noreferrer", rel].filter(Boolean).join(" ") : rel;

    return (
      <a
        {...anchorProps}
        className={classes}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        aria-label={loading && loadingLabel ? loadingLabel : anchorProps["aria-label"]}
        target={target}
        rel={externalRel}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", disabled: _disabled, ...buttonProps } = props as ButtonAsButtonProps;
  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={loading && loadingLabel ? loadingLabel : buttonProps["aria-label"]}
    >
      {inner}
    </button>
  );
}

export function ButtonLink(props: ButtonLinkProps) {
  return <Button {...props} as="a" />;
}

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Compact text action for disclosures and secondary inline actions. */
  children?: ReactNode;
}

/** A semantic button styled like an inline text link. */
export function TextButton({ type = "button", className = "", children, ...props }: TextButtonProps) {
  return <button type={type} className={["text-button", className].filter(Boolean).join(" ")} {...props}>{children}</button>;
}
