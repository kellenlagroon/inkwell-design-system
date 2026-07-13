import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Checkbox, TextInput } from "./forms";
import { Popover } from "./popover";

export interface CheckboxSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxSelectProps {
  options: CheckboxSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: ReactNode;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearLabel?: ReactNode;
  className?: string;
}

export function CheckboxSelect({
  options,
  value,
  onChange,
  label = "Filters",
  placeholder = "Select",
  searchable = false,
  searchPlaceholder = "Search",
  clearLabel = "Clear",
  className = "",
}: CheckboxSelectProps) {
  const [query, setQuery] = useState("");
  const selected = new Set(value);
  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );
  const triggerLabel = value.length > 0 ? `${label} (${value.length})` : placeholder;

  function toggle(optionValue: string) {
    const next = new Set(value);
    if (next.has(optionValue)) next.delete(optionValue);
    else next.add(optionValue);
    onChange(Array.from(next));
  }

  return (
    <Popover
      className={["checkbox-select-panel", className].filter(Boolean).join(" ")}
      trigger={(triggerProps) => (
        <Button variant="secondary" size="sm" {...triggerProps}>
          {triggerLabel}
        </Button>
      )}
    >
      <div className="checkbox-select">
        {searchable ? (
          <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        ) : null}
        <div className="checkbox-select-options">
          {filtered.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={selected.has(option.value)}
              disabled={option.disabled}
              onChange={() => toggle(option.value)}
            />
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onChange([])} disabled={value.length === 0}>
          {clearLabel}
        </Button>
      </div>
    </Popover>
  );
}
