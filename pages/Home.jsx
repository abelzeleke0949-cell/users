import React, { useState, useEffect } from "react";
import UserCard from "../component/UserCard";
import SearchBar from "../component/SearchBar";
import Loader from "../component/Loader";
import Pagination from "../component/Pagination";

const USERS_PER_PAGE = 6;

function Home({ darkMode, toggleDark }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favorites");
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError("Failed to load users. Please check your connection and try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify([...favorites]));
    }, [favorites]);


    useEffect(() => {
        setCurrentPage(1);
    }, [query]);


    const handleToggleFavorite = (userId) => {
        setFavorites((prev) => {
            const updated = new Set(prev);
            if (updated.has(userId)) {
                updated.delete(userId);
            } else {
                updated.add(userId);
            }
            return updated;
        });
    };


    const filteredUsers = users.filter((user) => {
        const q = query.toLowerCase();
        return (
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q) ||
            user.company.name.toLowerCase().includes(q)
        );
    });


    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        👥 User Directory
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
                    </p>
                </div>


                <button
                    onClick={toggleDark}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>


            <div className="max-w-6xl mx-auto">
                <SearchBar query={query} setQuery={setQuery} />
            </div>


            {loading && <Loader />}


            {error && (
                <div className="max-w-6xl mx-auto text-center py-16">
                    <p className="text-red-500 dark:text-red-400 text-lg">❌ {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Retry
                    </button>
                </div>
            )}


            {!loading && !error && filteredUsers.length === 0 && (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-lg">No users match your search.</p>
                </div>
            )}


            {!loading && !error && paginatedUsers.length > 0 && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            isFavorite={favorites.has(user.id)}
                            onToggleFav={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}


            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}

export default Home;