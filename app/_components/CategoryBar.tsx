"use client";

import { useState } from "react";
import CategoryModal from "./CategoryModal";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onAddCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
}

const CategoryBar = ({
  categories,
  selectedCategory,
  onAddCategory,
  onSelectCategory,
}: CategoryBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = (newCategory: string) => {
    onAddCategory(newCategory);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1 rounded ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-500 hover:text-blue-700"
      >
        ＋
      </button>
      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export default CategoryBar;
