import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    showPageInfo?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    showPageInfo = true
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="px-2 py-1">
                        ...
                    </span>
                );
            }
        }

        // Middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md border text-sm font-medium ${
                        i === currentPage
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="px-2 py-1">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className={`flex items-center justify-between ${className}`}>
            {showPageInfo && (
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Показано <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> до{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * 10, totalPages * 10)}
                        </span>{' '}
                        из <span className="font-medium">{totalPages * 10}</span> результатов
                    </p>
                </div>
            )}

            <nav className="flex items-center space-x-1">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`p-1 rounded-md ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Предыдущая страница"
                >
                    <FiChevronLeft className="h-5 w-5" />
                </button>

                <div className="hidden sm:flex space-x-1">
                    {renderPageNumbers()}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`p-1 rounded-md ${
                        currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Следующая страница"
                >
                    <FiChevronRight className="h-5 w-5" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
