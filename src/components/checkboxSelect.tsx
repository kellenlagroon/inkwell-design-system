import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { ControlTrigger } from "./controlTrigger";
import type { ControlDensity } from "./controlDensity";
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
  density?: ControlDensity;
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
  density,
}: CheckboxSelectProps) {
  const [query, setQuery] = useState("");
  const selected = new Set(value);
  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );
  const triggerLabel = value.length > 0 ? label : placeholder;

  function toggle(optionValue: string) {
    const next = new Set(value);
    if (next.has(optionValue)) next.delete(optionValue);
    else next.add(optionValue);
    onChange(Array.from(next));
  }

  return (
    <Popover
      mobileSheet
      panelClassName={["checkbox-select-panel", className].filter(Boolean).join(" ")}
      trigger={(triggerProps) => (
        <ControlTrigger
          {...triggerProps}
          value={triggerLabel}
          density={density}
          count={value.length || undefined}
          aria-label={value.length > 0 && typeof label === "string" ? `${label} (${value.length})` : undefined}
        />
      )}
    >
      <div className="checkbox-select">
        {searchable ? (
          <TextInput density={density} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        ) : null}
        <div className="checkbox-select-options">
          {filtered.map((option) => {
            const checked = selected.has(option.value);
            return (
              <div className="checkbox-select-option" key={option.value}>
                <Checkbox
                  label={option.label}
                  checked={checked}
                  disabled={option.disabled}
                  onChange={() => toggle(option.value)}
                  density={density}
                />
              </div>
            );
          })}
        </div>
        <Button variant="ghost" onClick={() => onChange([])} disabled={value.length === 0}>
          {clearLabel}
        </Button>
      </div>
    </Popover>
  );
}
