import { useState } from "react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination",
};

export const CallbackMode = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ padding: 24 }}>
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
      </div>
    );
  },
};

export const LinkMode = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Pagination page={3} pageCount={12} getPageHref={(page) => `?page=${page}`} />
    </div>
  ),
};
