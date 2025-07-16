// src/components/StatCard.tsx
import React from 'react';

interface StatCardProps {
    title: string;
    value: number;
    icon: string;
    trend: string;
    change: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, change }) => {
    const iconColors = {
        inbox: "bg-indigo-100 text-indigo-600",
        clock: "bg-blue-100 text-blue-600",
        spinner: "bg-yellow-100 text-yellow-600",
        check: "bg-green-100 text-green-600"
    };

    const iconType = icon.includes('inbox') ? 'inbox' :
        icon.includes('clock') ? 'clock' :
            icon.includes('spinner') ? 'spinner' : 'check';

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${iconColors[iconType]}`}>
                    <i className={`${icon}`}></i>
                </div>
            </div>
            <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-2 flex items-center`}>
                <i className={`fas fa-arrow-${trend} mr-1`}></i>
                <span>{change}% за месяц</span>
            </p>
        </div>
    );
};

export default StatCard;