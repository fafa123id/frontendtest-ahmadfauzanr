const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &lt;&lt;
      </button>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      {Array.from(
        { length: Math.min(5, totalPages) },
        (_, i) => {
          const pageNum = page - 2 + i;
          return (
            pageNum >= 1 &&
            pageNum <= totalPages && (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded ${
                  page === pageNum
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            )
          );
        }
      )}
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
