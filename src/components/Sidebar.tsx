// src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar:  () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <aside
            className={`fixed lg:relative z-30 w-64 bg-white shadow-md flex flex-col h-screen transition-transform duration-300 lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-indigo-700 flex items-center">
                    <i className="fas fa-tasks mr-2"></i>
                    ЗаявкиPRO
                </h1>
                <p className="text-xs text-gray-500 mt-1">Административная панель</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition-colors">
                        <i className="fas fa-inbox mr-3 w-5 text-center"></i>
                        Все заявки
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition-colors">
                        <i className="fas fa-clock mr-3 w-5 text-center"></i>
                        В работе
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition-colors">
                        <i className="fas fa-check-circle mr-3 w-5 text-center"></i>
                        Завершенные
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-user text-gray-500"></i>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Администратор</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;