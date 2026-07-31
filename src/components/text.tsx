import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type TextTone = "primary" | "secondary" | "muted" | "strong" | "danger" | "success" | "warning";
export type TextSize = "sm" | "md" | "lg";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "sm" | "md" | "lg" | "xl";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div" | "strong";
  tone?: TextTone;
  size?: TextSize;
  clamp?: 1 | 2 | 3;
  /**
   * `anywhere` breaks mid-word rather than overflowing. Use it for
   * user-generated strings with no break opportunities — emails, URLs, ids.
   * Defaults to `normal`, matching a plain paragraph.
   */
  wrap?: "normal" | "anywhere";
  truncate?: boolean;
  children?: ReactNode;
}

export function Text({ as: Component = "p", tone = "primary", size = "md", clamp, wrap = "normal", truncate = false, className = "", children, ...props }: TextProps) {
  const classes = [
    "ink-text",
    tone !== "primary" ? `ink-text--${tone}` : "",
    size !== "md" ? `ink-text--${size}` : "",
    clamp ? `ink-line-clamp ink-line-clamp--${clamp}` : "",
    wrap === "anywhere" ? "ink-wrap-anywhere" : "",
    truncate ? "ink-truncate" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Component className={classes} {...props}>{children}</Component>;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  children?: ReactNode;
}

export function Heading({ level = 2, size = "md", className = "", children, ...props }: HeadingProps) {
  const Component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const classes = ["ink-heading", size !== "md" ? `ink-heading--${size}` : "", className].filter(Boolean).join(" ");
  return <Component className={classes} {...props}>{children}</Component>;
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  children?: ReactNode;
}

export function Link({ external, target, rel, className = "", children, ...props }: LinkProps) {
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel = resolvedTarget === "_blank" ? ["noopener", "noreferrer", rel].filter(Boolean).join(" ") : rel;
  return (
    <a className={["ink-link", className].filter(Boolean).join(" ")} target={resolvedTarget} rel={resolvedRel} {...props}>
      {children}
    </a>
  );
}
