// src/components/ApplicationTable.tsx
import React, { useState } from 'react';
import { type Application } from './Dashboard';

interface ApplicationTableProps {
    applications: Application[];
    onView: (app: Application) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ applications, onView }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const getStatusStyles = (status: string) => {
        const baseStyles = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
        switch (status) {
            case 'new':
                return `${baseStyles} bg-blue-100 text-blue-800`;
            case 'in-progress':
                return `${baseStyles} bg-yellow-100 text-yellow-800`;
            case 'completed':
                return `${baseStyles} bg-green-100 text-green-800`;
            case 'rejected':
                return `${baseStyles} bg-red-100 text-red-800`;
            default:
                return `${baseStyles} bg-gray-100 text-gray-800`;
        }
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
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
                            {applications.map((app, index) => (
                                <tr
                                    key={app.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{app.client.name}</div>
                                                <div className="text-sm text-gray-500">{app.client.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {app.blueprintPhoto ? (
                                            <div 
                                                className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => handleImageClick(app.blueprintPhoto!)}
                                            >

                                                <img 
                                                    src={app.blueprintPhoto}
                                                    alt="Чертеж" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                                                    <i className="fas fa-search-plus text-white"></i>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                                                <i className="fas fa-file-image text-2xl"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{app.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{app.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={getStatusStyles(app.status)}>
                                            {app.status === 'new' && 'Новая'}
                                            {app.status === 'in-progress' && 'В работе'}
                                            {app.status === 'completed' && 'Завершена'}
                                            {app.status === 'rejected' && 'Отклонена'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            Этап {app.stages.current} из {app.stages.total}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-indigo-600 h-2 rounded-full" 
                                                style={{ width: `${(app.stages.current / app.stages.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onView(app)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors duration-200"
                                            title="Просмотреть"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-900 mr-3 transition-colors duration-200"
                                            title="Редактировать"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                            title="Удалить"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Пагинация */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Назад
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Вперед
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Показано <span className="font-medium">1</span> до <span className="font-medium">10</span> из <span className="font-medium">20</span> результатов
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Назад</span>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    8
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Вперед</span>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Просмотр чертежа
                                            </h3>
                                            <button 
                                                type="button" 
                                                className="text-gray-400 hover:text-gray-500"
                                                onClick={closeModal}
                                            >
                                                <span className="sr-only">Закрыть</span>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            <img 
                                                src={selectedImage} 
                                                alt="Чертеж" 
                                                className="w-full h-auto max-h-[70vh] object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    type="button" 
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Закрыть
                                </button>
                                <a 
                                    href={selectedImage} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>
                                    Открыть в новой вкладке
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplicationTable;