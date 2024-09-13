"use client";

import { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface CategoryModalProps {
  onClose: () => void;
  onAddCategory: (category: string) => void;
  errorMessage: string | null; // エラーメッセージの受け渡し
  setErrorMessage: (message: string | null) => void; // エラーメッセージの設定関数
}

const CategoryModal = ({
  onClose,
  onAddCategory,
  errorMessage,
  setErrorMessage,
}: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (!categoryName.trim()) {
      setErrorMessage("カテゴリー名を入力してください。");
      return;
    }
    onAddCategory(categoryName);
    setErrorMessage(null); // 成功したらエラーメッセージをクリア
    setCategoryName("");
    onClose(); // エラーがない場合のみモーダルを閉じる
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={() => {
        if (!errorMessage) onClose(); // エラーがない場合のみモーダルを閉じる
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-10/12 sm:w-1/3"
        onClick={(e) => e.stopPropagation()} // 内部部分のクリックイベントが外部に伝播しないようにする
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Category</h2>
          <button
            onClick={() => {
              if (!errorMessage) onClose(); // エラーがない場合のみモーダルを閉じる
            }}
            className="text-red-500"
          >
            <FaXmark size={20} />
          </button>
        </div>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Category Name"
        />
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              if (!errorMessage) onClose(); // エラーがない場合のみモーダルを閉じる
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded flex items-center"
          >
            <FaXmark size={16} />
            <span className="ml-1">Cancel</span>
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaCheck size={16} />
            <span className="ml-1">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
