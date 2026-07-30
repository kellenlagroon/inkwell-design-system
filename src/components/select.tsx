import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { IconArrowDown, IconCheck } from "./icons";
import { useFieldContext } from "./forms";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  variant?: "form" | "control";
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
  "aria-label"?: string;
  /** id of a visible element that labels the control. Takes precedence over `aria-label`. */
  "aria-labelledby"?: string;
  id?: string;
}

function firstEnabled(options: SelectOption[]): number {
  return options.findIndex((o) => !o.disabled);
}
function lastEnabled(options: SelectOption[]): number {
  for (let i = options.length - 1; i >= 0; i--) if (!options[i]!.disabled) return i;
  return -1;
}
function nextEnabled(options: SelectOption[], from: number, dir: 1 | -1): number {
  const n = options.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n;
    if (!options[i]!.disabled) return i;
  }
  return from;
}

/**
 * A custom listbox select. Fully keyboard operable: the trigger opens on
 * Arrow/Enter/Space; the open list supports Up/Down, Home/End, type-ahead,
 * Enter/Space to choose, and Escape to close (returning focus to the trigger).
 */
export function Select({
  value,
  onChange,
  options = [],
  placeholder = "",
  variant = "form",
  disabled = false,
  invalid = false,
  describedBy,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  id,
}: SelectProps) {
  const field = useFieldContext();
  const generatedId = useId();
  const triggerId = id ?? field?.id ?? generatedId;
  const listboxId = `${triggerId}-listbox`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const typeahead = useRef<{ buffer: string; timer: number | undefined }>({ buffer: "", timer: undefined });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const displayLabel = selectedOption?.label ?? placeholder;
  const isPlaceholder = !selectedOption;
  const resolvedInvalid = invalid || field?.invalid || false;

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    function handleOutside(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  // On open, start the active option at the current selection (or first enabled).
  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
    // Intentionally only re-run when `open` toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep DOM focus on the active option while open.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  function closeList(returnFocus = true) {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }

  function commit(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange?.(option.value);
    closeList();
  }

  function runTypeahead(char: string) {
    const state = typeahead.current;
    state.buffer += char.toLowerCase();
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.buffer = "";
    }, 500);
    const match = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(state.buffer));
    if (match >= 0) setActiveIndex(match);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) setOpen(true);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      closeList();
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => nextEnabled(options, i < 0 ? -1 : i, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => nextEnabled(options, i < 0 ? 0 : i, -1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(firstEnabled(options));
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(lastEnabled(options));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex >= 0) commit(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        closeList();
        break;
      case "Tab":
        closeList(false);
        break;
      default:
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
          runTypeahead(event.key);
        }
    }
  }

  const containerClass = ["cselect", variant === "control" ? "cselect--control" : "", open ? "open" : ""]
    .concat(resolvedInvalid ? ["cselect--invalid"] : [])
    .concat(className ? [className] : [])
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass} ref={containerRef}>
      <button
        type="button"
        ref={triggerRef}
        className="cselect-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy ?? field?.describedBy}
        id={triggerId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={["cselect-value", isPlaceholder ? "placeholder" : ""].filter(Boolean).join(" ")}>
          {displayLabel}
        </span>
        <IconArrowDown className="cselect-chevron" />
      </button>
      {open && (
        <div
          id={listboxId}
          className="cselect-dropdown"
          role="listbox"
          aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : triggerId)}
          aria-label={ariaLabelledBy ? undefined : ariaLabel}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              tabIndex={activeIndex === index ? 0 : -1}
              className={[
                "cselect-option",
                option.value === value ? "selected" : "",
                option.disabled ? "cselect-option--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="option"
              aria-selected={option.value === value ? "true" : "false"}
              // aria-disabled, not `disabled`: a disabled option must stay
              // perceivable and reachable by arrow keys per the listbox pattern.
              aria-disabled={option.disabled || undefined}
              onClick={() => commit(index)}
            >
              <span>{option.label}</span>
              {option.value === value && <IconCheck className="check-icon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
