import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type PillTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand";
export type PillAppearance = "bordered" | "borderless";

export interface PillColors {
  /** Foreground color for the label and any inline icon. */
  foreground?: CSSProperties["color"];
  /** Surface color. This remains transparent by default for borderless pills. */
  background?: CSSProperties["backgroundColor"];
  /** Outline color. Ignored by the borderless appearance. */
  border?: CSSProperties["borderColor"];
}

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Recommended semantic color preset. `neutral` is the default. */
  tone?: PillTone;
  /**
   * Visual treatment. By default, neutral and brand pills are bordered while
   * semantic tones are borderless. Set explicitly to override that convention.
   */
  appearance?: PillAppearance;
  /** Optional consumer-supplied foreground, background, and border colors. */
  colors?: PillColors;
  children?: ReactNode;
}

/**
 * A compact label chip. Use the recommended tones when they fit, or compose an
 * appearance and colors for product-specific metadata.
 */
export function Pill({ tone = "neutral", appearance, colors, children, className = "", style, ...props }: PillProps) {
  const resolvedAppearance = appearance ?? (tone === "neutral" || tone === "brand" ? "bordered" : "borderless");
  const colorVars = {
    "--ink-pill-foreground": colors?.foreground,
    "--ink-pill-background": colors?.background,
    "--ink-pill-border": colors?.border,
  } as CSSProperties;
  const classes = ["pill", `pill--${resolvedAppearance}`, tone !== "neutral" ? tone : "", className].filter(Boolean).join(" ");
  return (
    <span className={classes} style={{ ...style, ...colorVars }} {...props}>
      {children}
    </span>
  );
}
