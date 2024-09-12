"use client";

import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ConfirmDeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteCategoryModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteCategoryModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-10/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm Delete</h2>
          <button onClick={onClose} className="text-red-500">
            <FaXmark size={20} />
          </button>
        </div>
        <p className="mb-4">Are you sure you want to delete this category?</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center"
          >
            <FaCheck size={16} />
            <span className="ml-1">Confirm</span>
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

export default ConfirmDeleteCategoryModal;
