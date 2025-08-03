import React from 'react';
import { getStatusStyles, getStatusText } from '../../utils/tableUtils';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
    return (
        <span className={`${getStatusStyles(status)} ${className}`}>
            {getStatusText(status)}
        </span>
    );
};

export default StatusBadge;
