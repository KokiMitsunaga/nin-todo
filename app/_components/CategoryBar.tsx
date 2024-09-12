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
    <div className="w-full bg-white shadow-md">
      <div className="flex items-center px-4 py-2 border-b overflow-x-auto scrollbar-hide">
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(category)}
              className={`mr-4 pb-2 whitespace-nowrap ${
                selectedCategory === category
                  ? "border-b-2 border-pink-600 text-pink-600"
                  : "text-gray-600"
              } hover:text-pink-600`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700"
          >
            ＋
          </button>
        </div>
      </div>
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
