import React from 'react';

interface PhotoModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative max-w-4xl w-full max-h-screen overflow-auto">
                <img src={imageUrl} alt="Фото" className="w-full h-auto rounded-lg shadow-lg" />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                    <i className="fas fa-times text-gray-600"></i>
                </button>
            </div>
        </div>
    );
};

export default PhotoModal;