import React from "react";


function SearchBar({ query, setQuery }) {
    return (
        <div className="w-full max-w-lg mx-auto mb-8">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔎 Search by name, email, or company..."
                className="
          w-full px-5 py-3 rounded-xl border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          text-sm
        "
            />
        </div>
    );
}

export default SearchBar;