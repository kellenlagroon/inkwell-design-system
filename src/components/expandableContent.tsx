import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { TextDisclosure } from "./button";

const INTERACTIVE = "a[href], button, input, select, textarea, [tabindex]";

export interface ExpandableContentProps {
  children: ReactNode;
  /** Height of the visible excerpt in pixels. */
  collapsedHeight?: number;
  /** Show the disclosure only when content exceeds this height in pixels. */
  collapseThreshold?: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  collapsedLabel?: ReactNode;
  expandedLabel?: ReactNode;
  className?: string;
}

/** A measured disclosure for long, consumer-owned content. */
export function ExpandableContent({
  children,
  collapsedHeight = 96,
  collapseThreshold = 160,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  collapsedLabel = "Show more",
  expandedLabel = "Show less",
  className = "",
}: ExpandableContentProps) {
  const id = useId();
  const regionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const suppressedRef = useRef(new Map<HTMLElement, { tabIndex: string | null; ariaHidden: string | null }>());
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const isExpanded = expanded ?? internalExpanded;
  const excerptHeight = Math.max(0, collapsedHeight);
  const threshold = Math.max(excerptHeight, collapseThreshold);
  const canCollapse = contentHeight > threshold;
  const clipped = canCollapse && !isExpanded;

  function restoreFocusables() {
    for (const [element, original] of suppressedRef.current) {
      if (original.tabIndex === null) element.removeAttribute("tabindex");
      else element.setAttribute("tabindex", original.tabIndex);
      if (original.ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", original.ariaHidden);
    }
    suppressedRef.current.clear();
  }

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const measure = () => setContentHeight(inner.scrollHeight);
    measure();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(inner);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  useLayoutEffect(() => {
    restoreFocusables();
    const region = regionRef.current;
    if (!clipped || !region) return restoreFocusables;
    const bottom = region.getBoundingClientRect().top + excerptHeight;
    const focused = document.activeElement as HTMLElement | null;
    if (focused && region.contains(focused) && focused.getBoundingClientRect().top >= bottom) {
      triggerRef.current?.querySelector("button")?.focus();
    }
    for (const element of region.querySelectorAll<HTMLElement>(INTERACTIVE)) {
      if (element.getBoundingClientRect().top < bottom) continue;
      suppressedRef.current.set(element, {
        tabIndex: element.getAttribute("tabindex"),
        ariaHidden: element.getAttribute("aria-hidden"),
      });
      element.setAttribute("tabindex", "-1");
      element.setAttribute("aria-hidden", "true");
    }
    return restoreFocusables;
  }, [children, clipped, excerptHeight, contentHeight]);

  function changeExpanded(next: boolean) {
    const trigger = triggerRef.current?.querySelector("button");
    if (!next && regionRef.current?.contains(document.activeElement)) trigger?.focus();
    const before = !next ? trigger?.getBoundingClientRect().top : undefined;
    if (expanded === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
    if (before !== undefined) {
      requestAnimationFrame(() => {
        const after = triggerRef.current?.querySelector("button")?.getBoundingClientRect().top;
        if (after !== undefined) window.scrollBy(0, after - before);
      });
    }
  }

  return (
    <div className={["ink-expandable-content", className].filter(Boolean).join(" ")}>
      <div
        id={id}
        ref={regionRef}
        className={["ink-expandable-content__region", clipped ? "ink-expandable-content__region--clipped" : ""].filter(Boolean).join(" ")}
        style={{ "--ink-expandable-collapsed-height": `${excerptHeight}px` } as CSSProperties}
      >
        <div ref={innerRef}>{children}</div>
      </div>
      {canCollapse ? (
        <span ref={triggerRef}>
          <TextDisclosure
            className="ink-expandable-content__trigger"
            expanded={isExpanded}
            controls={id}
            collapsedLabel={collapsedLabel}
            expandedLabel={expandedLabel}
            onExpandedChange={changeExpanded}
          />
        </span>
      ) : null}
    </div>
  );
}
