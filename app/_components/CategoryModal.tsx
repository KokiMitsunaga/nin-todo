"use client";

import { useState } from "react";

interface CategoryModalProps {
  onClose: () => void;
  onAddCategory: (category: string) => void;
}

const CategoryModal = ({ onClose, onAddCategory }: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAddCategory(categoryName);
      setCategoryName("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Add New Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
