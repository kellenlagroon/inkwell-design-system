import { useState } from "react";
import { Pagination } from "./pagination";

export default {
  title: "Components/Pagination/Features",
};

export const CallbackMode = {
  render: () => {
    const [page, setPage] = useState(6);
    return (
      <div style={{ padding: 24 }}>
        <Pagination page={page} pageCount={20} onPageChange={setPage} />
      </div>
    );
  },
};

export const LinkMode = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Pagination page={6} pageCount={20} getPageHref={(page) => `?page=${page}`} />
    </div>
  ),
};

export const ShortRange = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Pagination page={2} pageCount={3} onPageChange={() => {}} />
    </div>
  ),
};

