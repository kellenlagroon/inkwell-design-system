import type { ReactNode } from "react";
import { Collapsible } from "./collapsible";
import { Pill } from "./pill";

export interface StatusSummaryCompactItem {
  label: ReactNode;
  value: ReactNode;
  tone?: "info" | "success" | "warning" | "danger" | "neutral" | "brand";
}

export interface StatusSummaryCompactProps {
  items: StatusSummaryCompactItem[];
  detail?: ReactNode;
  detailLabel?: ReactNode;
  className?: string;
}

export function StatusSummaryCompact({ items, detail, detailLabel = "Details", className = "" }: StatusSummaryCompactProps) {
  const row = (
    <span className={["status-summary-compact", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => (
        <span className="status-summary-compact-item" key={index}>
          <span>{item.label}</span>
          <Pill tone={item.tone ?? "neutral"}>{item.value}</Pill>
        </span>
      ))}
    </span>
  );
  if (!detail) return row;
  return (
    <Collapsible title={detailLabel} meta={row}>
      <div className="status-summary-detail">{detail}</div>
    </Collapsible>
  );
}
