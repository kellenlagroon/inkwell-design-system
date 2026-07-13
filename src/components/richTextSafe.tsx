import type { HTMLAttributes, ReactNode } from "react";

export interface RichTextSafeProps extends HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  children?: ReactNode;
}

/** Styled container for consumer-sanitized rich HTML. Sanitization stays app-owned. */
export function RichTextSafe({ collapsed = false, className = "", children, ...props }: RichTextSafeProps) {
  return (
    <div className={["ink-rich-text", collapsed ? "ink-rich-text--collapsed" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
