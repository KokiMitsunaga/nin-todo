"use client";

import { useState } from "react";
import CategoryModal from "./CategoryModal";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onAddCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
  onEditCategory: (category: string) => void;
  errorMessage: string | null; // エラーメッセージ
  setErrorMessage: (message: string | null) => void;
}

const CategoryBar = ({
  categories,
  selectedCategory,
  onAddCategory,
  onSelectCategory,
  onEditCategory,
  errorMessage,
  setErrorMessage,
}: CategoryBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // カテゴリー追加ボタンがクリックされたときの処理
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
                // 選ばれているカテゴリーをもう一度タップした時の挙動
                if (selectedCategory === category) {
                  // TODOカテゴリーは編集しない
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
            className="ml-auto text-blue-500"
          >
            ＋
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onAddCategory={handleAddCategory}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default CategoryBar;
