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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentCategory || ""
  );

  useEffect(() => {
    setSelectedCategory(currentCategory || "");
  }, [currentCategory]);

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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">
          Choose a category to restore
        </h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded ${
              isConfirmDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={isConfirmDisabled}
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
