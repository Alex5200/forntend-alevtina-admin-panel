import React from 'react';
import {type Application } from '../Dashboard';

interface ActionButtonsProps {
    app: Application;
    onView: (app: Application) => void;
    onEdit?: (app: Application) => void;
    onDelete?: (app: Application) => void;
    className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    app,
    onView,
    onEdit,
    onDelete,
    className = ''
}) => {
    const handleClick = (e: React.MouseEvent, action: (app: Application) => void) => {
        e.stopPropagation();
        action(app);
    };

    return (
        <div className={`flex justify-end space-x-2 ${className}`}>
            <button
                onClick={(e) => handleClick(e, onView)}
                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                title="Просмотреть"
                aria-label="Просмотреть заявку"
            >
                <i className="fas fa-eye"></i>
            </button>

            {onEdit && (
                <button
                    onClick={(e) => handleClick(e, onEdit)}
                    className="text-green-600 hover:text-green-900 transition-colors duration-200"
                    title="Редактировать"
                    aria-label="Редактировать заявку"
                >
                    <i className="fas fa-edit"></i>
                </button>
            )}

            {onDelete && (
                <button
                    onClick={(e) => handleClick(e, onDelete)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Удалить"
                    aria-label="Удалить заявку"
                >
                    <i className="fas fa-trash"></i>
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
