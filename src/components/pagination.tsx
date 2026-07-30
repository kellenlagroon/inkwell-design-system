import { useId } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Select } from "./select";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  siblingCount?: number;
  /** Accessible label for the previous-page icon button. */
  previousLabel?: string;
  /** Accessible label for the next-page icon button. */
  nextLabel?: string;
  "aria-label"?: string;
  className?: string;
  /** Use the compact result-summary layout. Defaults to false. */
  compact?: boolean | "auto";
  /** Show a control for choosing how many results appear on each page. */
  showPageSizeSelector?: boolean;
  /** Currently selected number of results per page. */
  pageSize?: number;
  /** Total number of results, used in the compact range summary. */
  totalResults?: number;
  /** Available page-size choices. Defaults to 10, 25, and 50. */
  pageSizeOptions?: number[];
  /** Called when the user chooses a new page size. */
  onPageSizeChange?: (pageSize: number) => void;
  /** Visible label for the page-size control. */
  pageSizeLabel?: ReactNode;
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

function PageChevron({ direction }: { direction: "previous" | "next" }) {
  const d = direction === "previous" ? "m14 6l-6 6l6 6" : "m10 6l6 6l-6 6";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
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
  compact = false,
  showPageSizeSelector = false,
  pageSize,
  totalResults,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
  pageSizeLabel = "Results per page",
}: PaginationProps) {
  const baseId = useId();
  const pageSizeLabelId = `${baseId}-page-size-label`;
  const pageSizeSelectId = `${baseId}-page-size`;
  const selectedPageSize = String(pageSize ?? pageSizeOptions[0] ?? 10);
  const effectivePageSize = Number(selectedPageSize);
  const resolvedPageCount = totalResults === undefined
    ? Math.max(1, pageCount)
    : Math.max(1, Math.ceil(totalResults / effectivePageSize));
  const current = Math.min(Math.max(1, page), resolvedPageCount);
  const canPrevious = current > 1;
  const canNext = current < resolvedPageCount;
  const resolvedTotalResults = totalResults ?? pageCount * effectivePageSize;
  const firstResult = resolvedTotalResults === 0 ? 0 : (current - 1) * effectivePageSize + 1;
  const lastResult = Math.min(current * effectivePageSize, resolvedTotalResults);
  const summary = showPageSizeSelector || totalResults !== undefined
    ? `${firstResult}–${lastResult} of ${resolvedTotalResults}`
    : `Page ${current} of ${resolvedPageCount}`;

  function renderPageAction(targetPage: number, label: ReactNode, extra?: Partial<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>>) {
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

  function renderNavigationAction(targetPage: number, direction: "previous" | "next", disabled: boolean, label: string) {
    const common = {
      className: "icon-btn ink-pagination-action",
      "aria-disabled": disabled || undefined,
      "aria-label": label,
    };
    const icon = <PageChevron direction={direction} />;
    if (getPageHref) return <a {...common} href={disabled ? undefined : getPageHref(targetPage)}>{icon}</a>;
    return <button {...common} type="button" disabled={disabled} onClick={() => onPageChange?.(targetPage)}>{icon}</button>;
  }

  return (
    <nav className={["ink-pagination", compact === true ? "ink-pagination--compact" : compact === "auto" ? "ink-pagination--auto-compact" : "", className].filter(Boolean).join(" ")} aria-label={ariaLabel}>
      {renderNavigationAction(current - 1, "previous", !canPrevious, previousLabel)}
      <ol className="ink-pagination-list">
        {items(current, resolvedPageCount, siblingCount).map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <span className="ink-pagination-ellipsis" aria-hidden="true">...</span>
            ) : renderPageAction(item, item, { "aria-current": item === current ? "page" : undefined, "aria-label": `Page ${item}` })}
          </li>
        ))}
      </ol>
      {/* Doubles as the live region that announces page changes — it stays in
          the a11y tree at every breakpoint and is only visually revealed in
          compact layouts (see .ink-pagination-summary). */}
      <span className="ink-pagination-summary" role="status" aria-live="polite">{summary}</span>
      {renderNavigationAction(current + 1, "next", !canNext, nextLabel)}
      {showPageSizeSelector && (
        <div className="ink-pagination-page-size">
          <span id={pageSizeLabelId}>{pageSizeLabel}</span>
          <Select
            id={pageSizeSelectId}
            aria-labelledby={pageSizeLabelId}
            variant="control"
            value={selectedPageSize}
            options={pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))}
            disabled={!onPageSizeChange}
            onChange={(value) => onPageSizeChange?.(Number(value))}
          />
        </div>
      )}
    </nav>
  );
}
