import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  siblingCount?: number;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  "aria-label"?: string;
  className?: string;
  compact?: boolean | "auto";
}

type PageItem = number | "ellipsis";

function range(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

function items(page: number, pageCount: number, siblingCount: number): PageItem[] {
  if (pageCount <= 7) return range(1, pageCount);
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  return [1, ...(start > 2 ? ["ellipsis" as const] : []), ...range(start, end), ...(end < pageCount - 1 ? ["ellipsis" as const] : []), pageCount];
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  getPageHref,
  siblingCount = 1,
  previousLabel = "Previous",
  nextLabel = "Next",
  "aria-label": ariaLabel = "Pagination",
  className = "",
  compact = "auto",
}: PaginationProps) {
  const current = Math.min(Math.max(1, page), Math.max(1, pageCount));
  const canPrevious = current > 1;
  const canNext = current < pageCount;

  function renderAction(targetPage: number, label: ReactNode, extra?: Partial<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>>) {
    const common = {
      className: "ink-pagination-item",
      "aria-disabled": extra?.disabled || undefined,
      ...extra,
    };
    if (getPageHref) {
      return <a {...common} href={extra?.disabled ? undefined : getPageHref(targetPage)}>{label}</a>;
    }
    return <button {...common} type="button" disabled={extra?.disabled} onClick={() => onPageChange?.(targetPage)}>{label}</button>;
  }

  return (
    <nav className={["ink-pagination", compact === true ? "ink-pagination--compact" : compact === "auto" ? "ink-pagination--auto-compact" : "", className].filter(Boolean).join(" ")} aria-label={ariaLabel}>
      {renderAction(current - 1, previousLabel, { disabled: !canPrevious })}
      <ol className="ink-pagination-list">
        {items(current, pageCount, siblingCount).map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <span className="ink-pagination-ellipsis" aria-hidden="true">...</span>
            ) : renderAction(item, item, { "aria-current": item === current ? "page" : undefined, "aria-label": `Page ${item}` })}
          </li>
        ))}
      </ol>
      <span className="ink-pagination-summary" aria-live="polite">Page {current} of {Math.max(1, pageCount)}</span>
      {renderAction(current + 1, nextLabel, { disabled: !canNext })}
    </nav>
  );
}
