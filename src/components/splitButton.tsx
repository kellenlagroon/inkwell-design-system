import type { HTMLAttributes, ReactNode } from "react";
import { IconArrowDown } from "./icons.jsx";
import { Popover, PopoverMenuItem } from "./popover";
import type { ControlDensity } from "./controlDensity";
export type SplitButtonDensity = ControlDensity;

export interface SplitButtonItem {
  /** Item label. Also the React key, so keep it unique within the menu. */
  label: string;
  /** Optional second line under the label. */
  description?: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Surface color behind the icon. */
  iconBg?: string;
  /** Icon foreground color. */
  iconColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** Label for the main action. */
  primaryLabel: ReactNode;
  /** Handler for the main action. */
  onPrimaryClick?: () => void;
  /** Secondary actions shown in the dropdown menu. */
  items?: SplitButtonItem[];
  /** Accessible name for the dropdown trigger. Describe what the menu contains. */
  menuLabel?: string;
  /** Disables the primary action and the menu trigger. */
  disabled?: boolean;
  /** Shared control density for the paired actions. */
  density?: SplitButtonDensity;
}

/**
 * A primary action paired with a menu of related actions. The menu is a
 * `Popover` in `menu` mode, so it inherits roving arrow-key navigation,
 * Home/End, Escape-to-close, and focus return to the trigger.
 */
export function SplitButton({
  primaryLabel,
  onPrimaryClick,
  items = [],
  menuLabel = "More actions",
  disabled = false,
  density,
  className = "",
  ...props
}: SplitButtonProps) {
  return (
    <div className={["split-button", className].filter(Boolean).join(" ")} {...props}>
      <button type="button" className={['split-button-primary', density && density !== "default" ? `ink-control-density--${density}` : ""].filter(Boolean).join(" ")} onClick={onPrimaryClick} disabled={disabled}>
        {primaryLabel}
      </button>
      <div className="split-button-divider" />
      <Popover
        mode="menu"
        placement="bottom-end"
        ariaLabel={menuLabel}
        rootClassName="split-button-menu"
        panelClassName="split-dropdown"
        trigger={({ ref, open, onToggle, onClick: _onClick, ...triggerProps }) => (
          <button
            ref={ref as (node: HTMLButtonElement | null) => void}
            {...triggerProps}
            type="button"
            className={['split-button-chevron', density && density !== "default" ? `ink-control-density--${density}` : ""].filter(Boolean).join(" ")}
            aria-label={menuLabel}
            disabled={disabled}
            onClick={onToggle}
          >
            <IconArrowDown style={open ? { transform: "rotate(180deg)" } : undefined} />
          </button>
        )}
      >
        {items.map((item) => (
          <PopoverMenuItem
            key={item.label}
            className="split-dropdown-item"
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.icon ? (
              <span
                className="split-dropdown-icon"
                style={{ background: item.iconBg, color: item.iconColor }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            ) : null}
            <span className="split-dropdown-copy">
              <span className="split-dropdown-label">{item.label}</span>
              {item.description ? <span className="split-dropdown-desc">{item.description}</span> : null}
            </span>
          </PopoverMenuItem>
        ))}
      </Popover>
    </div>
  );
}
