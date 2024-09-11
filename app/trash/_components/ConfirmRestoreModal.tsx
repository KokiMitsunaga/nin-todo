import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ConfirmRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmRestoreModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmRestoreModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-10/12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm Restore</h2>
          <button onClick={onClose} className="text-red-500">
            <FaXmark size={20} />
          </button>
        </div>
        <p className="mb-4">Are you sure you want to restore this item?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 flex items-center"
          >
            <FaCheck size={16} />
            <span className="ml-1">Restore</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded flex items-center"
          >
            <FaXmark size={16} />
            <span className="ml-1">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRestoreModal;
