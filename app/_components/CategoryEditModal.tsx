"use client";

import { useState, useEffect } from "react";
import ConfirmDeleteCategoryModal from "./ConfirmDeleteCategoryModal";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  onEditCategory: (newName: string) => void;
  onDeleteCategory: () => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

const CategoryEditModal = ({
  isOpen,
  onClose,
  category,
  onEditCategory,
  onDeleteCategory,
  errorMessage,
  setErrorMessage,
}: CategoryEditModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    setNewCategoryName(category || "");
  }, [category]);

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    if (!newCategoryName.trim()) {
      setErrorMessage("カテゴリー名を入力してください。");
      return;
    }
    onEditCategory(newCategoryName.trim());
    setErrorMessage(null);
    onClose();
  };

  // 削除ボタンがクリックされたときの処理
  const handleDeleteCategory = () => {
    setShowConfirmDelete(true);
  };

  // 削除確認モーダルで削除が確認されたときの処理
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
          if (!errorMessage && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-10/12 sm:w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              カテゴリーの編集: {category}
            </h3>
            <button
              onClick={() => {
                if (!errorMessage) onClose();
              }}
              className="text-red-500"
            >
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
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDeleteCategory}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaXmark size={16} />
              <span className="ml-1">削除</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaCheck size={16} />
              <span className="ml-1">保存</span>
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
