// src/components/Dashboard.tsx
import React, { useState, useMemo } from 'react';
import StatCard from './StatCard';
import ApplicationTable from './ApplicationTable';
import ApplicationModal from './ApplicationModal';
import applicationsData from './voice/voice';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
export interface Application {
    id: string;
    client: {
        name: string;
        email: string;
        avatar: string;
    };
    type: string;
    date: string;
    status: 'new' | 'in-progress' | 'completed' | 'rejected' | 'review';
    stages: {
        current: number;
        total: number;
    };
    blueprintPhoto?: string; // URL to the blueprint/drawing photo
    description?: string;
}

type SortField = 'date' | 'clientName' | 'type' | 'status';
type SortOrder = 'asc' | 'desc';

const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique statuses and types for filter options
    const statuses = useMemo(() => {
        const uniqueStatuses = new Set(applicationsData.map(app => app.status));
        return ['all', ...Array.from(uniqueStatuses)];
    }, []);

    const types = useMemo(() => {
        const uniqueTypes = new Set(applicationsData.map(app => app.type));
        return ['all', ...Array.from(uniqueTypes)];
    }, []);

    // Apply filters and sort using useMemo for performance
    const filteredAndSortedApplications = useMemo(() => {
        let result = [...applicationsData];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(app => 
                app.client.name.toLowerCase().includes(query) ||
                app.client.email.toLowerCase().includes(query) ||
                app.type.toLowerCase().includes(query) ||
                app.description?.toLowerCase().includes(query) ||
                app.id.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(app => app.status === statusFilter);
        }

        // Apply type filter
        if (typeFilter !== 'all') {
            result = result.filter(app => app.type === typeFilter);
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;
            
            switch (sortField) {
                case 'date':
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;
                case 'clientName':
                    comparison = a.client.name.localeCompare(b.client.name);
                    break;
                case 'type':
                    comparison = a.type.localeCompare(b.type);
                    break;
                case 'status':
                    comparison = a.status.localeCompare(b.status);
                    break;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [applicationsData, searchQuery, statusFilter, typeFilter, sortField, sortOrder]);

    const stats = [
        { 
            title: "Всего заявок", 
            value: applicationsData.length, 
            icon: "fas fa-inbox", 
            trend: "up", 
            change: 12 
        },
        { 
            title: "Новые", 
            value: applicationsData.filter(app => app.status === 'new').length, 
            icon: "fas fa-bell",
            trend: "up",
            change: 5
        },
        { 
            title: "В работе", 
            value: applicationsData.filter(app => app.status === 'in-progress').length, 
            icon: "fas fa-cog",
            trend: "up",
            change: 3
        },
        { 
            title: "На проверке", 
            value: applicationsData.filter(app => app.status === 'review').length, 
            icon: "fas fa-search",
            trend: "up",
            change: 0
        },
        { 
            title: "Завершено", 
            value: applicationsData.filter(app => app.status === 'completed').length, 
            icon: "fas fa-check-circle",
            trend: "up",
            change: 8
        },
    ];

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const resetFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setSearchQuery('');
    };

    const getSortIndicator = (field: SortField) => {
        if (sortField !== field) return null;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const handleViewApplication = (app: Application) => {
        setSelectedApplication(app);
        setIsModalOpen(true);
    };

    return (
        <main className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                    <StatCard 
                        key={index} 
                        title={stat.title} 
                        value={stat.value} 
                        icon={stat.icon} 
                        trend={stat.trend} 
                        change={stat.change} 
                    />
                ))}
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative w-full md:w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Поиск по клиенту, типу..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FiFilter className="mr-2 h-4 w-4" />
                            Фильтры
                            {showFilters ? (
                                <FiChevronDown className="ml-2 h-4 w-4 transform rotate-180" />
                            ) : (
                                <FiChevronDown className="ml-2 h-4 w-4" />
                            )}
                        </button>

                        {(statusFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiX className="mr-1 h-4 w-4" />
                                Сбросить
                            </button>
                        )}
                    </div>
                </div>

                {/* Expanded filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">Все статусы</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status === 'in-progress' ? 'В работе' : 
                                             status === 'completed' ? 'Завершено' : 
                                             status === 'rejected' ? 'Отклонено' : 
                                             'Новые'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Тип заявки</label>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <option value="all">Все типы</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <div className="flex space-x-2 w-full">
                                    <button 
                                        onClick={() => handleSort('date')}
                                        className={`flex-1 px-4 py-2 border rounded-md text-sm font-medium ${
                                            sortField === 'date' 
                                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        Сортировать по дате {getSortIndicator('date')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">
                    Найдено заявок: <span className="font-medium">{filteredAndSortedApplications.length}</span>
                </div>
                <ApplicationTable
                    applications={filteredAndSortedApplications}
                    onView={handleViewApplication}
                />
            </div>

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