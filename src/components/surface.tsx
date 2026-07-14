import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
export type SurfaceTone = "default" | "raised" | "muted";
export type ResponsivePadding = "none" | "sm" | "md" | "lg";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padded?: boolean;
  /** Token-backed padding. Overrides `padded`; mobile padding scales down automatically. */
  padding?: ResponsivePadding;
  children?: ReactNode;
}

export function Container({ size = "lg", padded = true, padding, className = "", children, ...props }: ContainerProps) {
  return (
    <div className={["ink-container", `ink-container--${size}`, padding ? `ink-padding--${padding}` : padded ? "ink-container--padded" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  minHeight?: string;
  maxWidth?: ContainerSize;
  padded?: boolean;
  children?: ReactNode;
}

export function Center({ minHeight, maxWidth, padded = true, className = "", style, children, ...props }: CenterProps) {
  const nextStyle = { ...style, "--ink-center-min-height": minHeight } as CSSProperties;
  return (
    <div className={["ink-center", padded ? "ink-center--padded" : "", className].filter(Boolean).join(" ")} style={nextStyle} {...props}>
      {maxWidth ? <div className={`ink-container ink-container--${maxWidth}`}>{children}</div> : children}
    </div>
  );
}

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SurfaceTone;
  padded?: boolean;
  padding?: ResponsivePadding;
  children?: ReactNode;
}

export function Surface({ tone = "default", padded = true, padding, className = "", children, ...props }: SurfaceProps) {
  return (
    <div className={["ink-surface", tone !== "default" ? `ink-surface--${tone}` : "", padding ? `ink-padding--${padding}` : padded ? "ink-surface--padded" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export const Paper = Surface;
