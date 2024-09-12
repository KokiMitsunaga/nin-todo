import React, { useState, useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ConfirmRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedCategory: string) => void;
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    setSelectedCategory(
      currentCategory || (categories.length > 0 ? categories[0] : "")
    );
  }, [currentCategory, categories]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedCategory) {
      onConfirm(selectedCategory);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isConfirmDisabled = selectedCategory === "";

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-10/12 sm:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Choose a category to restore
          </h3>
          <button onClick={onClose} className="text-red-500">
            <FaXmark size={20} />
          </button>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded flex items-center ${
              isConfirmDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={isConfirmDisabled}
          >
            <FaCheck size={16} className="mr-1" />
            Restore
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaXmark size={16} className="mr-1" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRestoreModal;
