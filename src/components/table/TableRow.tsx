import React from 'react';
import {type Application } from '../Dashboard';
import ImagePreview from './ImagePreview';
import StatusBadge from './StatusBadge';
import StageProgress from './StageProgress';
import ActionButtons from './ActionButtons';

interface TableRowProps {
    application: Application;
    onView: (app: Application) => void;
    onEdit?: (app: Application) => void;
    onDelete?: (app: Application) => void;
    className?: string;
}

const TableRow: React.FC<TableRowProps> = ({
    application: app,
    onView,
    onEdit,
    onDelete,
    className = ''
}) => {
    const handleRowClick = () => {
        onView(app);
    };

    return (
        <tr
            className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${className}`}
            onClick={handleRowClick}
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
                <ImagePreview
                    imageUrl={app.blueprintPhoto}
                    alt="Чертеж"
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{app.type}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{app.date}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={app.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <StageProgress
                    current={app.stages.current}
                    total={app.stages.total}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <ActionButtons
                    app={app}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </td>
        </tr>
    );
};

export default TableRow;
