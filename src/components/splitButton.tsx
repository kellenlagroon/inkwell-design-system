import { useState, useEffect, useRef, type ReactNode } from "react";
import { IconArrowDown } from "./icons.jsx";

export interface SplitButtonItem {
  label: string;
  description?: string;
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
}

export interface SplitButtonProps {
  primaryLabel: ReactNode;
  onPrimaryClick?: () => void;
  items?: SplitButtonItem[];
}

export function SplitButton({ primaryLabel, onPrimaryClick, items = [] }: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  function handleItemClick(onClick?: () => void) {
    setOpen(false);
    onClick?.();
  }

  return (
    <div className="split-button" ref={containerRef}>
      <button type="button" className="split-button-primary" onClick={onPrimaryClick}>
        {primaryLabel}
      </button>
      <div className="split-button-divider" />
      <button
        type="button"
        className="split-button-chevron"
        onClick={() => setOpen((v) => !v)}
        aria-label="More round types"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
      >
        <IconArrowDown style={open ? { transform: "rotate(180deg)" } : undefined} />
      </button>
      {open && (
        <div className="split-dropdown" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className="split-dropdown-item"
              role="menuitem"
              onClick={() => handleItemClick(item.onClick)}
            >
              <span
                className="split-dropdown-icon"
                style={{ background: item.iconBg, color: item.iconColor }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="split-dropdown-copy">
                <span className="split-dropdown-label">{item.label}</span>
                <span className="split-dropdown-desc">{item.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
