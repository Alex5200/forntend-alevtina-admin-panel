// src/components/Dashboard.tsx
import React, { useState } from 'react';
import StatCard from './StatCard';
import ApplicationTable from './ApplicationTable';
import ApplicationModal from './ApplicationModal';

export interface Application {
    id: string;
    client: {
        name: string;
        email: string;
        avatar: string;
    };
    type: string;
    date: string;
    status: 'new' | 'in-progress' | 'completed' | 'rejected';
    stages: {
        current: number;
        total: number;
    };
    blueprintPhoto?: string; // URL to the blueprint/drawing photo
    description?: string;
}
const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    // Моковые данные
    const applications: Application[] = [
        {
            id: "#1254",
            client: {
                name: "Иван Смирнов",
                email: "ivan@example.com",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            type: "Техническая",
            date: "15.06.2023",
            status: "new",
            stages: { current: 1, total: 5 },
            blueprintPhoto: "https://picsum.photos/800/600", // URL to the blueprint/drawing photo

        },
        // ... другие заявки
    ];

    const stats = [
        { title: "Всего заявок", value: 142, icon: "fas fa-inbox", trend: "up", change: 12 },
        // ... другие статистики
    ];

    const handleViewApplication = (app: Application) => {
        setSelectedApplication(app);
        setIsModalOpen(true);
    };

    return (
        <main className="p-6">
            {/* Фильтры и кнопки */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} trend={stat.trend} change={stat.change}></StatCard>
                ))}
            </div>

            <ApplicationTable
                applications={applications}
                onView={handleViewApplication}
            />

            {isModalOpen && selectedApplication && (
                <ApplicationModal
                    application={selectedApplication}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </main>
    );
};

export default Dashboard;