"use client";

import { useState } from "react";
import ConfirmDeleteCategoryModal from "./ConfirmDeleteCategoryModal";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  onEditCategory: (newName: string) => void;
  onDeleteCategory: () => void;
}

const CategoryEditModal = ({
  isOpen,
  onClose,
  category,
  onEditCategory,
  onDeleteCategory,
}: CategoryEditModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSave = () => {
    if (newCategoryName.trim()) {
      onEditCategory(newCategoryName.trim());
      onClose();
    }
  };

  const handleDeleteCategory = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (category) {
      onDeleteCategory();
    }
  };

  return isOpen && category ? (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-10/12 sm:w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit Category: {category}</h3>
            <button onClick={onClose} className="text-red-500">
              <FaXmark size={20} />
            </button>
          </div>
          <input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaCheck size={16} />
              <span className="ml-1">Save</span>
            </button>
            <button
              onClick={handleDeleteCategory}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaXmark size={16} />
              <span className="ml-1">Delete</span>
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
      <ConfirmDeleteCategoryModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  ) : null;
};

export default CategoryEditModal;
