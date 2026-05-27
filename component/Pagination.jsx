import React from "react";


function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;


    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center gap-2 mt-10">

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-blue-50 dark:hover:bg-gray-700 transition
        "
            >
                ← Prev
            </button>


            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`
            w-9 h-9 rounded-lg text-sm font-medium transition
            ${currentPage === page
                            ? "bg-blue-600 text-white shadow"
                            : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                        }
          `}
                >
                    {page}
                </button>
            ))}


            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-blue-50 dark:hover:bg-gray-700 transition
        "
            >
                Next →
            </button>
        </div>
    );
}

export default Pagination;