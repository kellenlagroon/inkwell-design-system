import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { NavVariantContext } from "./navContext";

export type NavOrientation = "horizontal" | "vertical";
export type NavVariant = "chip" | "list";

export interface NavItem {
  /** Stable identifier used to detect the active item. */
  value: string;
  /** Visible label. */
  label: ReactNode;
  /** Optional leading icon. Any ReactNode; sized to 1em by icon components. */
  icon?: ReactNode;
  /** Optional trailing badge. `true` renders a small notification dot with no content; any other value renders as a pill containing that content. */
  badge?: ReactNode | true;
  /** If set, the item renders as an `<a>` for real navigation. */
  href?: string;
}

export interface NavProps {
  /** The items to render, in order. */
  items: NavItem[];
  /** The active item's value. */
  value: string;
  /** Called with the new value when an item is activated. */
  onChange?: (value: string, event: MouseEvent) => void;
  /** Layout axis. Defaults to `"horizontal"`. */
  orientation?: NavOrientation;
  /** Visual style. `chip` (default) is a segmented pill with a sliding indicator; `list` is a full-width list tuned for sidebars (no slider, tinted active row). Sidebar defaults its nested Nav to `list` automatically. */
  variant?: NavVariant;
  /** Dock a horizontal Nav to the bottom of a narrow app container. Defaults to `false`. */
  mobileDocked?: boolean;
  /** Accessible name for the wrapping `<nav>`. Required for a11y when the surrounding page has more than one nav. */
  "aria-label"?: string;
  /** Optional class name appended to the root. */
  className?: string;
}

/**
 * Primary product navigation with an animated sliding indicator behind the
 * active item. Renders each item as a `<button>` by default, or an `<a>` when
 * `href` is set — pair `href` with `onChange` for SPA routers that need to
 * intercept the click.
 *
 * The sliding indicator tracks the active item on both axes: horizontal moves
 * `translateX + width`; vertical moves `translateY + height`.
 */
export function Nav({
  items,
  value,
  onChange,
  orientation = "horizontal",
  variant,
  mobileDocked = false,
  "aria-label": ariaLabel,
  className,
}: NavProps) {
  const contextVariant = useContext(NavVariantContext);
  const resolvedVariant: NavVariant = variant ?? contextVariant ?? "chip";
  const usesSlider = resolvedVariant === "chip";
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [indicator, setIndicator] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const activeIndex = items.findIndex((item) => item.value === value);

  const measure = useCallback(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) {
      setIndicator(null);
      return;
    }
    setIndicator((prev) => {
      const next = { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
      if (
        prev &&
        prev.left === next.left &&
        prev.top === next.top &&
        prev.width === next.width &&
        prev.height === next.height
      ) {
        return prev;
      }
      return next;
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (!usesSlider) {
      setIndicator(null);
      return;
    }
    measure();
  }, [measure, orientation, items, usesSlider]);

  // ResizeObserver: catch layout shifts from font-load, container resize, or
  // Storybook Docs canvases that mount collapsed and expand a frame later.
  useEffect(() => {
    if (!usesSlider) return;
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    if (trackRef.current) observer.observe(trackRef.current);
    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [measure, items, usesSlider]);

  // Re-measure after web fonts finish loading (text metrics shift by a few px).
  useEffect(() => {
    if (!usesSlider) return;
    const fonts = (typeof document !== "undefined" ? document.fonts : undefined) as FontFaceSet | undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure, usesSlider]);

  const classes = [
    "ink-nav",
    `ink-nav--${orientation}`,
    `ink-nav--${resolvedVariant}`,
    mobileDocked ? "ink-nav--mobile-docked" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <div className="ink-nav-track" ref={trackRef}>
        {usesSlider ? (
          <span
            className="ink-nav-slider"
            aria-hidden="true"
            hidden={!indicator}
            style={
              indicator
                ? {
                    transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                    width: `${indicator.width}px`,
                    height: `${indicator.height}px`,
                  }
                : undefined
            }
          />
        ) : null}
        {items.map((item, index) => {
          const active = item.value === value;
          const itemClass = ["ink-nav-item", active ? "ink-nav-item--active" : ""].filter(Boolean).join(" ");
          const isDot = item.badge === true;
          const hasBadge = isDot || (item.badge !== undefined && item.badge !== null && item.badge !== false);
          const inner = (
            <>
              {item.icon ? <span className="ink-nav-icon" aria-hidden="true">{item.icon}</span> : null}
              <span className="ink-nav-label">{item.label}</span>
              {hasBadge ? (
                <span
                  className={["ink-nav-badge", isDot ? "ink-nav-badge--dot" : ""].filter(Boolean).join(" ")}
                  aria-hidden={isDot ? "true" : undefined}
                >
                  {isDot ? null : item.badge}
                </span>
              ) : null}
            </>
          );

          function handleClick(event: MouseEvent<HTMLElement>) {
            onChange?.(item.value, event);
          }

          const ref = (el: HTMLElement | null) => {
            itemRefs.current[index] = el;
          };

          if (item.href !== undefined) {
            const props: AnchorHTMLAttributes<HTMLAnchorElement> = {
              href: item.href,
              className: itemClass,
              "aria-current": active ? "page" : undefined,
              onClick: handleClick,
            };
            return (
              <a key={item.value} {...props} ref={ref as (el: HTMLAnchorElement | null) => void}>
                {inner}
              </a>
            );
          }

          const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
            type: "button",
            className: itemClass,
            "aria-current": active ? "page" : undefined,
            onClick: handleClick,
          };
          return (
            <button key={item.value} {...buttonProps} ref={ref as (el: HTMLButtonElement | null) => void}>
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
