import React, { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ConfirmRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedCategory: string) => void; // 修正
  categories: string[];
  currentCategory: string | null;
}

const ConfirmRestoreModal = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  currentCategory,
}: ConfirmRestoreModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState(
    currentCategory || ""
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedCategory) {
      onConfirm(selectedCategory);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Choose a category to restore
        </h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
        >
          <option value="">Select category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            <FaCheck className="inline-block mr-1" /> Restore
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            <FaXmark className="inline-block mr-1" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRestoreModal;
