import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Shape preset. `text` is a single-line placeholder; `circle` is 1:1; `rect` is generic. Defaults to "text". */
  variant?: SkeletonVariant;
  /** CSS width. Defaults to `100%` for text/rect, or `size` for circles. */
  width?: number | string;
  /** CSS height. Defaults to `1em` for text, `size` for circle, and requires a value for rect. */
  height?: number | string;
  /** Convenience for circles — sets both width and height. Defaults to 40. */
  size?: number | string;
  /** Number of stacked text lines. Only applies to `variant="text"`. */
  lines?: number;
}

function normalize(value: number | string | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * A placeholder block that shimmers while content is loading. `text` reads as a
 * single line (or `lines`-many); `circle` is a 1:1 avatar-style placeholder;
 * `rect` is a generic block sized by width/height. Always decorative — a
 * surrounding region should announce the loading state.
 */
export function Skeleton({ variant = "text", width, height, size = 40, lines, className = "", style, ...props }: SkeletonProps) {
  const classes = ["ink-skeleton", `ink-skeleton--${variant}`, className].filter(Boolean).join(" ");

  const styleFor = (index?: number): CSSProperties => {
    if (variant === "circle") {
      const d = normalize(width ?? size);
      return { width: d, height: normalize(height ?? size) ?? d };
    }
    if (variant === "rect") {
      return { width: normalize(width) ?? "100%", height: normalize(height) };
    }
    // text
    const isLast = lines != null && index === lines - 1;
    return {
      // A shorter last line reads as natural paragraph flow.
      width: isLast ? "68%" : normalize(width) ?? "100%",
      height: normalize(height),
    };
  };

  if (variant === "text" && lines != null && lines > 1) {
    return (
      <span className="ink-skeleton-lines" aria-hidden="true" style={style} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className={classes} style={styleFor(i)} />
        ))}
      </span>
    );
  }

  return <span className={classes} style={{ ...style, ...styleFor() }} aria-hidden="true" {...props} />;
}
