// src/components/ApplicationModal.tsx
import React, { useState } from 'react';
import { type Application } from './Dashboard';

interface Comment {
    id: string;
    author: string;
    avatar: string;
    text: string;
    date: string;
}

interface ApplicationModalProps {
    application: Application;
    onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ application, onClose }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'drawings'>('details');
    const [commentText, setCommentText] = useState('');
    
    // Mock comments data - in a real app, this would come from an API
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            author: 'Алексей Петров',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'Проверил чертежи, все в порядке. Можно переходить к следующему этапу.',
            date: '2023-08-01 14:30'
        },
        {
            id: '2',
            author: 'Ирина Сидорова',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'Необходимо уточнить размеры на чертеже 2.1',
            date: '2023-08-01 15:45'
        }
    ]);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        
        const newComment: Comment = {
            id: Date.now().toString(),
            author: 'Вы',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
            text: commentText,
            date: new Date().toISOString()
        };
        
        setComments([newComment, ...comments]);
        setCommentText('');
    };

    const getStatusBadge = (status: string) => {
        const baseStyles = 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full';
        switch (status) {
            case 'new':
                return `${baseStyles} bg-blue-100 text-blue-800`;
            case 'in-progress':
                return `${baseStyles} bg-yellow-100 text-yellow-800`;
            case 'review':
                return `${baseStyles} bg-purple-100 text-purple-800`;
            case 'completed':
                return `${baseStyles} bg-green-100 text-green-800`;
            case 'rejected':
                return `${baseStyles} bg-red-100 text-red-800`;
            default:
                return `${baseStyles} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Заявка #{application.id}
                                </h3>
                                <div className="mt-1">
                                    <span className={getStatusBadge(application.status)}>
                                        {application.status === 'new' && 'Новая'}
                                        {application.status === 'in-progress' && 'В работе'}
                                        {application.status === 'review' && 'На проверке'}
                                        {application.status === 'completed' && 'Завершена'}
                                        {application.status === 'rejected' && 'Отклонена'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mt-4">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Детали
                                </button>
                                <button
                                    onClick={() => setActiveTab('comments')}
                                    className={`${activeTab === 'comments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Комментарии ({comments.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('drawings')}
                                    className={`${activeTab === 'drawings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Чертежи
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === 'details' && (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Клиент</h4>
                                        <div className="flex items-center mt-1">
                                            <img 
                                                className="h-10 w-10 rounded-full" 
                                                src={application.client.avatar} 
                                                alt={application.client.name} 
                                            />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{application.client.name}</p>
                                                <p className="text-sm text-gray-500">{application.client.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Тип заявки</h4>
                                        <p className="mt-1 text-sm text-gray-900">{application.type}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Дата создания</h4>
                                        <p className="mt-1 text-sm text-gray-900">{application.date}</p>
                                    </div>

                                    {application.description && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Описание</h4>
                                            <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{application.description}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Прогресс</h4>
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className="bg-blue-600 h-2.5 rounded-full" 
                                                    style={{ width: `${(application.stages.current / application.stages.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500 text-right">
                                                Этап {application.stages.current} из {application.stages.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div className="space-y-4">
                                    <form onSubmit={handleAddComment} className="flex space-x-2">
                                        <input
                                            type="text"
                                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Напишите комментарий..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Отправить
                                        </button>
                                    </form>

                                    <div className="space-y-4 mt-4">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="flex">
                                                <img 
                                                    className="h-10 w-10 rounded-full" 
                                                    src={comment.avatar} 
                                                    alt={comment.author} 
                                                />
                                                <div className="ml-3">
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <div className="flex items-center">
                                                            <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                                                            <span className="mx-1">·</span>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(comment.date).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'drawings' && (
                                <div className="space-y-4">
                                    {application.blueprintPhoto ? (
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <img 
                                                src={application.blueprintPhoto} 
                                                alt="Чертеж" 
                                                className="w-full h-auto rounded"
                                            />
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Чертеж 1</span>
                                                <a 
                                                    href={application.blueprintPhoto} 
                                                    download
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Скачать
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                                            <i className="fas fa-file-image text-4xl text-gray-300 mb-2"></i>
                                            <p className="text-gray-500">Нет доступных чертежей</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;