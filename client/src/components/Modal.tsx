import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
    useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

      return () => {
    document.removeEventListener("keydown", handleEsc);
    document.body.style.overflow = "auto";
      };
      }, [onClose]);

  return (
    // --- Backdrop ---
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onMouseDown={onClose}>
      
      {/* --- Modal Content -- */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 sm:mx-0 z-50 animate-fade-in-up" 
        onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* -- Modal Header -- */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* -- Modal Body -- */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
