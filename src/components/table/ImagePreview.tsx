import React, { useState } from 'react';
import { FiX, FiZoomIn } from 'react-icons/fi';

interface ImagePreviewProps {
    imageUrl?: string | null;
    alt: string;
    className?: string;
    previewClassName?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
    imageUrl,
    alt,
    className = '',
    previewClassName = ''
}) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (imageUrl) {
            setIsPreviewOpen(true);
        }
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    if (!imageUrl) {
        return (
            <div className={`w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 ${className}`}>
                <i className="fas fa-file-image text-2xl"></i>
            </div>
        );
    }

    return (
        <>
            <div
                className={`relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${className}`}
                onClick={handleImageClick}
                role="button"
                aria-label="Просмотреть изображение"
            >
                <img
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                    <FiZoomIn className="text-white text-lg" />
                </div>
            </div>

            {isPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
                    <div className="relative max-w-4xl w-full bg-white rounded-lg p-4">
                        <button
                            onClick={closePreview}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            aria-label="Закрыть просмотр"
                        >
                            <FiX className="text-2xl" />
                        </button>
                        <img
                            src={imageUrl}
                            alt={alt}
                            className={`w-full h-auto max-h-[80vh] object-contain ${previewClassName}`}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagePreview;
