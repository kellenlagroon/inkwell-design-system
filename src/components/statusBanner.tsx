import { useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { IconClose } from "./icons";

export type StatusBannerTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand" | "error";

/** Tones that report a problem, and so should interrupt rather than queue. */
const ASSERTIVE_TONES = new Set<StatusBannerTone>(["danger", "error", "warning"]);

export interface StatusBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Banner copy. When empty/falsy the banner renders nothing. */
  message?: ReactNode;
  /** Semantic tone. `success` uses the default styling (no modifier). */
  tone?: StatusBannerTone;
  /** When provided, renders a dismiss button that calls this handler. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss control. */
  dismissLabel?: string;
  /**
   * How the message is announced. Defaults to `assertive` for problem tones and
   * `polite` otherwise. Set `off` for a banner that is static on mount and so
   * shouldn't be announced as a change.
   */
  live?: "polite" | "assertive" | "off";
}

/**
 * An inline, persistent status message for a surface or form. Use for state
 * that should stay visible (vs. a transient Toast). Announces itself when it
 * appears — see `live` to override how.
 */
export function StatusBanner({
  message,
  tone,
  onDismiss,
  dismissLabel = "Dismiss",
  live,
  className = "",
  ...props
}: StatusBannerProps) {
  const messageRef = useRef<HTMLSpanElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const resolvedTone = tone === "error" ? "danger" : tone;
  const toneClass = resolvedTone && resolvedTone !== "success" ? `status-banner--${resolvedTone}` : "";

  useLayoutEffect(() => {
    const element = messageRef.current;
    if (!element) return undefined;

    const updateLineCount = () => {
      const range = document.createRange();
      range.selectNodeContents(element);
      if (typeof range.getClientRects === "function") {
        setIsMultiline(range.getClientRects().length > 1);
      }
    };

    updateLineCount();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(updateLineCount);
    observer?.observe(element);
    window.addEventListener("resize", updateLineCount);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateLineCount);
    };
  }, [message]);

  if (!message) return null;

  const resolvedLive = live ?? (resolvedTone && ASSERTIVE_TONES.has(resolvedTone) ? "assertive" : "polite");

  return (
    <div
      className={["status-banner", toneClass, isMultiline ? "status-banner--multiline" : "", className].filter(Boolean).join(" ")}
      role={resolvedLive === "off" ? undefined : resolvedLive === "assertive" ? "alert" : "status"}
      aria-live={resolvedLive === "off" ? undefined : resolvedLive}
      {...props}
    >
      <span ref={messageRef}>{message}</span>
      {onDismiss ? (
        <button type="button" className="banner-dismiss" aria-label={dismissLabel} onClick={onDismiss}>
          <IconClose />
        </button>
      ) : null}
    </div>
  );
}
