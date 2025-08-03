import React from 'react';

interface StageProgressProps {
    current: number;
    total: number;
    className?: string;
}

const StageProgress: React.FC<StageProgressProps> = ({ current, total, className = '' }) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className={className}>
            <div className="text-sm text-gray-900">
                Этап {current} из {total}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={current}
                    aria-valuemin={0}
                    aria-valuemax={total}
                />
            </div>
        </div>
    );
};

export default StageProgress;
