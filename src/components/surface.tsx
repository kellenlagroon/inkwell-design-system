import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
export type SurfaceTone = "default" | "raised" | "muted";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padded?: boolean;
  children?: ReactNode;
}

export function Container({ size = "lg", padded = true, className = "", children, ...props }: ContainerProps) {
  return (
    <div className={["ink-container", `ink-container--${size}`, padded ? "ink-container--padded" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  minHeight?: string;
  children?: ReactNode;
}

export function Center({ minHeight, className = "", style, children, ...props }: CenterProps) {
  const nextStyle = { ...style, "--ink-center-min-height": minHeight } as CSSProperties;
  return (
    <div className={["ink-center", className].filter(Boolean).join(" ")} style={nextStyle} {...props}>
      {children}
    </div>
  );
}

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SurfaceTone;
  padded?: boolean;
  children?: ReactNode;
}

export function Surface({ tone = "default", padded = true, className = "", children, ...props }: SurfaceProps) {
  return (
    <div className={["ink-surface", tone !== "default" ? `ink-surface--${tone}` : "", padded ? "ink-surface--padded" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export const Paper = Surface;
