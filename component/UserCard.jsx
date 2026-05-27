import React from "react";
import { useNavigate } from "react-router-dom";


function UserCard({ user, isFavorite, onToggleFav }) {
    const navigate = useNavigate();


    const avatarColors = [
        "bg-blue-500", "bg-purple-500", "bg-green-500",
        "bg-rose-500", "bg-amber-500", "bg-teal-500",
        "bg-indigo-500", "bg-pink-500", "bg-orange-500", "bg-cyan-500",
    ];
    const avatarColor = avatarColors[(user.id - 1) % avatarColors.length];


    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            onClick={() => navigate(`/users/${user.id}`)}
            className="
        relative cursor-pointer rounded-2xl p-6
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-lg
        hover:-translate-y-1 transition-all duration-200
      "
        >

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(user.id);
                }}
                className="absolute top-4 right-4 text-xl"
                aria-label="Toggle favorite"
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>


            <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 ${avatarColor}`}
            >
                {initials}
            </div>


            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                👤 {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                📧 {user.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                📱 {user.phone}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                🏢 {user.company.name}
            </p>
            <p className="text-sm text-blue-500 dark:text-blue-400">
                🌐 {user.website}
            </p>
        </div>
    );
}

export default UserCard;