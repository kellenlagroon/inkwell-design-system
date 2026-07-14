import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** The tabs to render, in order. */
  tabs: TabItem[];
  /** The selected tab's value (controlled). */
  value: string;
  /** Called with the new value when the selection changes. */
  onChange: (value: string) => void;
  /** Accessible name for the tablist. */
  "aria-label"?: string;
  /**
   * Base id. When set, each tab gets `${id}-tab-${value}` and references its
   * panel via `aria-controls="${id}-panel-${value}"` — give the matching panel
   * that id, `role="tabpanel"`, and `aria-labelledby` the tab id.
   */
  id?: string;
}

function firstEnabled(tabs: TabItem[]): number {
  return tabs.findIndex((t) => !t.disabled);
}
function lastEnabled(tabs: TabItem[]): number {
  for (let i = tabs.length - 1; i >= 0; i--) if (!tabs[i]!.disabled) return i;
  return -1;
}
function nextEnabled(tabs: TabItem[], from: number, dir: 1 | -1): number {
  const n = tabs.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n;
    if (!tabs[i]!.disabled) return i;
  }
  return from;
}

/**
 * A segmented tab bar with a sliding underline indicator. Controlled: it renders
 * the tablist and reports selection via `onChange`; render the matching panel
 * yourself. Fully keyboard operable (Left/Right/Up/Down move and activate,
 * Home/End jump to the ends, disabled tabs are skipped).
 */
export function Tabs({ tabs, value, onChange, "aria-label": ariaLabel, id }: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = tabs.findIndex((t) => t.value === value);

  useEffect(() => {
    const btn = tabRefs.current[activeIndex];
    if (btn) {
      setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
      btn.scrollIntoView?.({ block: "nearest", inline: "nearest" });
    }
  }, [activeIndex, tabs]);

  function selectAt(index: number) {
    const tab = tabs[index];
    if (!tab || tab.disabled) return;
    onChange(tab.value);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectAt(nextEnabled(tabs, activeIndex < 0 ? -1 : activeIndex, 1));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectAt(nextEnabled(tabs, activeIndex < 0 ? 0 : activeIndex, -1));
        break;
      case "Home":
        event.preventDefault();
        selectAt(firstEnabled(tabs));
        break;
      case "End":
        event.preventDefault();
        selectAt(lastEnabled(tabs));
        break;
    }
  }

  return (
    <div className="ink-tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {tabs.map((tab, index) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={id ? `${id}-tab-${tab.value}` : undefined}
            aria-selected={selected ? "true" : "false"}
            aria-controls={id ? `${id}-panel-${tab.value}` : undefined}
            tabIndex={selected ? 0 : -1}
            disabled={tab.disabled}
            className={["ink-tab", selected ? "ink-tab--active" : ""].filter(Boolean).join(" ")}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
      <span
        className="ink-tab-indicator"
        aria-hidden="true"
        style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
      />
    </div>
  );
}
