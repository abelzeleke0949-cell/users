import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";


function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span className="w-44 text-sm font-semibold text-gray-500 dark:text-gray-400 shrink-0">
                {label}
            </span>
            <span className="text-gray-800 dark:text-gray-100 text-sm break-all">
                {value}
            </span>
        </div>
    );
}

function UserDetails({ darkMode, toggleDark }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!res.ok) throw new Error(`User not found (status ${res.status})`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError("Could not load user details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
            <div className="max-w-2xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
                    >
                        ← Back
                    </button>


                    <button
                        onClick={toggleDark}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>


                {loading && <Loader />}


                {error && (
                    <div className="text-center py-16 text-red-500 dark:text-red-400">
                        <p className="text-4xl mb-3">❌</p>
                        <p>{error}</p>
                    </div>
                )}


                {!loading && !error && user && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">


                        <div className="bg-blue-600 dark:bg-blue-700 px-8 py-10 flex flex-col items-center text-white">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-4">
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-blue-100 text-sm mt-1">@{user.username}</p>
                        </div>


                        <div className="px-8 py-6 space-y-6">

                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
                                    Personal Info
                                </h2>
                                <DetailRow label="👤 Full Name" value={user.name} />
                                <DetailRow label="🆔 Username" value={`@${user.username}`} />
                                <DetailRow label="📧 Email" value={user.email} />
                                <DetailRow label="📱 Phone" value={user.phone} />
                                <DetailRow label="🌐 Website" value={user.website} />
                            </section>

                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
                                    🏢 Company
                                </h2>
                                <DetailRow label="Company Name" value={user.company.name} />
                                <DetailRow label="Catch Phrase" value={user.company.catchPhrase} />
                                <DetailRow label="Business" value={user.company.bs} />
                            </section>

                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2">
                                    📍 Address
                                </h2>
                                <DetailRow label="Street" value={`${user.address.street}, ${user.address.suite}`} />
                                <DetailRow label="🏙️ City" value={user.address.city} />
                                <DetailRow label="📮 Zip" value={user.address.zipcode} />
                                <DetailRow label="🌍 Geo" value={`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`} />
                            </section>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDetails;