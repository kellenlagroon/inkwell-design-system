import { useState } from "react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination",
};

export const Playground = {
  args: {
    pageCount: 10,
    compact: false,
    showPageSizeSelector: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
    totalResults: 100,
  },
  argTypes: {
    pageCount: { control: { type: "number", min: 1 } },
    compact: { control: "boolean" },
    showPageSizeSelector: { control: "boolean" },
    pageSize: { control: { type: "select" }, options: [10, 25, 50] },
    pageSizeOptions: { control: false },
    totalResults: { control: { type: "number", min: 0 } },
  },
  render: ({ pageCount, compact, showPageSizeSelector, pageSize: initialPageSize, pageSizeOptions, totalResults }) => {
    function Demo() {
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(initialPageSize);
      const resolvedPageCount = Math.max(1, pageCount);
      return (
        <div style={{ padding: 24 }}>
          <Pagination
            page={Math.min(page, resolvedPageCount)}
            pageCount={resolvedPageCount}
            onPageChange={setPage}
            compact={compact}
            showPageSizeSelector={showPageSizeSelector}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            totalResults={totalResults}
            onPageSizeChange={(nextPageSize) => {
              setPage(1);
              setPageSize(nextPageSize);
            }}
          />
        </div>
      );
    }
    return <Demo />;
  },
};
