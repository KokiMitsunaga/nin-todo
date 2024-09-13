"use client";

import { useState } from "react";
import CategoryModal from "./CategoryModal";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onAddCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
  onEditCategory: (category: string) => void; // 追加
  errorMessage: string | null; // エラーメッセージの受け渡し
  setErrorMessage: (message: string | null) => void; // エラーメッセージの設定関数
}

const CategoryBar = ({
  categories,
  selectedCategory,
  onAddCategory,
  onSelectCategory,
  onEditCategory, // 追加
  errorMessage,
  setErrorMessage,
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
              onClick={() => {
                if (selectedCategory === category) {
                  if (category !== "TODO") {
                    onEditCategory(category);
                  }
                } else {
                  onSelectCategory(category);
                }
              }}
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
          errorMessage={errorMessage} // 追加
          setErrorMessage={setErrorMessage} // 追加
        />
      )}
    </div>
  );
};

export default CategoryBar;
