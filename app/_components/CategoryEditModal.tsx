"use client";

import { useState } from "react";

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

  const handleSave = () => {
    if (newCategoryName.trim()) {
      onEditCategory(newCategoryName.trim());
      onClose();
    }
  };

  return isOpen && category ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Edit Category: {category}
        </h3>
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onDeleteCategory}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategoryEditModal;
