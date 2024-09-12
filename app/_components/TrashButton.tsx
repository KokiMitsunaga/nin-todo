"use client";

import { IoTrash } from "react-icons/io5";
import { useState } from "react";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import { Todo } from "../_types/types";

interface TrashButtonProps {
  selectedTodos: Todo[];
  onConfirmDelete: () => void;
}

const TrashButton = ({ selectedTodos, onConfirmDelete }: TrashButtonProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = () => {
    if (selectedTodos.length > 0) {
      setDeleteModalOpen(true);
    }
  };

  const isButtonDisabled = selectedTodos.length === 0;

  return (
    <>
      <button
        onClick={handleClick}
        className={`bg-white p-4 rounded-full border flex items-center justify-center ${
          isButtonDisabled
            ? "text-gray-300 cursor-not-allowed"
            : "text-pink-600"
        }`}
        disabled={isButtonDisabled}
      >
        <IoTrash size={24} />
      </button>

      <ConfirmDeleteItemModal
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
