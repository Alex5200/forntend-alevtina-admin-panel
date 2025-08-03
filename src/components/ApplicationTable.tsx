// src/components/ApplicationTable.tsx
import React, { useState } from 'react';
import {type Application } from './Dashboard';
import ApplicationModal from './ApplicationModal';
import TableRow from './table/TableRow';
import Pagination from './table/Pagination';

interface ApplicationTableProps {
    applications: Application[];
    onView: (app: Application) => void;
    onEdit?: (app: Application) => void;
    onDelete?: (app: Application) => void;
    itemsPerPage?: number;
    className?: string;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
    applications,
    onView,
    onEdit,
    onDelete,
    itemsPerPage = 10,
    className = ''
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(applications.length / itemsPerPage));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Optional: Scroll to top of the table
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRowClick = (app: Application) => {
        setSelectedApplication(app);
        onView(app);
    };

    const handleCloseModal = () => {
        setSelectedApplication(null);
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden mb-6 ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Клиент
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Чертеж
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Тип заявки
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Дата
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Статус
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Этап
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Действия</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((app, index) => (
                                <TableRow
                                    key={app.id}
                                    application={app}
                                    onView={handleRowClick}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Нет данных для отображения
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            {applications.length > itemsPerPage && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        showPageInfo={true}
                    />
                </div>
            )}
            
            {/* Application Modal */}
            {selectedApplication && (
                <ApplicationModal
                    application={selectedApplication}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ApplicationTable;