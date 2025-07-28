import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
  } from "lucide-react";
  
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5
    const visiblePages = [];
  
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);
  
    if (currentPage <= half) {
      start = 2;
      end = Math.min(totalPages - 1, maxVisiblePages);
    }
  
    if (currentPage > totalPages - half) {
      start = Math.max(2, totalPages - maxVisiblePages + 1);
      end = totalPages - 1;
    }
  
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    console.log(visiblePages)
  
    return (
      <div className="flex justify-center gap-1 mt-8 flex-wrap items-center text-sm">
        {/* First Page*/}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="First page"
        >
          <ChevronsLeft size={18} />
        </button>
  
        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
  
        {/* Page 1 */}
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          1
        </button>
  
        {start > 2 && <span className="px-2">…</span>}
  
        {visiblePages.map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`px-3 py-1 rounded ${
              n === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
  
        {end < totalPages - 1 && <span className="px-2">…</span>}
  
        {/* Last Page */}
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {totalPages}
          </button>
        )}
  
        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
  
        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    );
  };
  
  export default Pagination;
  