// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="mr-4 text-gray-500 lg:hidden"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Управление заявками</h2>
            </div>

            <div className="flex items-center space-x-4">
                {/* Элементы управления */}
            </div>
        </header>
    );
};

export default Header;