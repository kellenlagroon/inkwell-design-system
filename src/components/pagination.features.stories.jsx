import { useState } from "react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination/Features",
};

export const Compact = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ padding: 24 }}>
        <Pagination
          page={page}
          pageCount={10}
          totalResults={100}
          onPageChange={setPage}
          compact
        />
      </div>
    );
  },
};

export const WithPageSizeSelector = {
  render: () => {
    const [page, setPage] = useState(2);
    const [pageSize, setPageSize] = useState(25);
    return (
      <div style={{ padding: 24 }}>
        <Pagination
          page={page}
          pageCount={12}
          onPageChange={setPage}
          compact
          showPageSizeSelector
          pageSize={pageSize}
          totalResults={284}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};
