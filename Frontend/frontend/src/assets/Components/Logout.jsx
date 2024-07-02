import React, { useState } from "react";
import { useAuth } from "../Components/AuthContext";

export const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, getUser } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="relative">
            <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-200 rounded-full dark:bg-gray-400">
                    <span className="font-medium text-gray-400 dark:text-gray-200">
                        {getUser ? getUser[0].toUpperCase() : 'U'}
                    </span>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <button 
                        onClick={handleLogout} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};


