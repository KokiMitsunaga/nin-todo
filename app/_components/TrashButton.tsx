"use client";

import { IoTrash } from "react-icons/io5";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface TrashButtonProps {
  selectedTodos: any[];
  onConfirmDelete: () => void;
}

const TrashButton = ({ selectedTodos, onConfirmDelete }: TrashButtonProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = () => {
    if (selectedTodos.length > 0) {
      setDeleteModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`text-pink-600 bg-white p-4 rounded-full border flex items-center justify-center ${
          selectedTodos.length === 0 ? "text-gray-300 cursor-not-allowed" : ""
        }`}
        disabled={selectedTodos.length === 0}
      >
        <IoTrash size={24} />
      </button>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          onConfirmDelete();
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default TrashButton;
