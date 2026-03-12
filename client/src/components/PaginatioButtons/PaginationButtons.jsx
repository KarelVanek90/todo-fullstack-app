import React from "react";

const PaginationButtons = ({ page, pages, setPage }) => {
  return (
    <div className="flex gap-2 justify-between">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-2 py-1 rounded ${page !== 1 ? "hover:bg-green-100" : ""}`}
      >
        Předchozí
      </button>
      <div className="mt-2">
        <span className="text-xs">
          {page} / {pages}
        </span>
      </div>

      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className={`px-2 py-1 rounded ${page !== pages ? "hover:bg-green-100" : ""}`}
      >
        Další
      </button>
    </div>
  );
};

export default PaginationButtons;
