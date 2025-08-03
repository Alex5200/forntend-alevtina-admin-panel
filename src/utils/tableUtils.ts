
export const getStatusStyles = (status: string): string => {
    const baseStyles = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
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

export const getStatusText = (status: string): string => {
    switch (status) {
        case 'new':
            return 'Новая';
        case 'in-progress':
            return 'В работе';
        case 'review':
            return 'На проверке';
        case 'completed':
            return 'Завершена';
        case 'rejected':
            return 'Отклонена';
        default:
            return status;
    }
};
