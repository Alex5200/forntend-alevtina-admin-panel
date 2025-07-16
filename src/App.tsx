// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 font-sans">
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 overflow-auto">
                    <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default App;