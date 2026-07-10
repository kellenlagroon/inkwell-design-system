import type { ReactNode } from "react";
import { IconClose } from "./icons";

export type StatusBannerTone = "success" | "warning" | "error";

export interface StatusBannerProps {
  /** Banner copy. When empty/falsy the banner renders nothing. */
  message?: ReactNode;
  /** Semantic tone. `success` uses the default styling (no modifier). */
  tone?: StatusBannerTone;
  /** When provided, renders a dismiss button that calls this handler. */
  onDismiss?: () => void;
}

/**
 * An inline, persistent status message for a surface or form. Use for state
 * that should stay visible (vs. a transient Toast).
 */
export function StatusBanner({ message, tone, onDismiss }: StatusBannerProps) {
  if (!message) return null;
  const toneClass = tone === "error" ? "error" : tone === "warning" ? "warning" : "";
  return (
    <div className={["status-banner", toneClass].filter(Boolean).join(" ")}>
      <span>{message}</span>
      {onDismiss ? (
        <button type="button" className="banner-dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <IconClose />
        </button>
      ) : null}
    </div>
  );
}
