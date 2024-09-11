"use client";

import { useState, useEffect } from "react";
import ReButton from "./_components/ReButton";
import RemoveButton from "../_components/RemoveButton";
import ConfirmRestoreModal from "./_components/ConfirmRestoreModal";
import ConfirmDeleteModal from "../_components/ConfirmDeleteModal";

const TrashPage = () => {
  const [trashTodos, setTrashTodos] = useState<
    { title: string; description: string; priority: number }[]
  >([]);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedTrashTodos = localStorage.getItem("trashTodos");
    if (savedTrashTodos) {
      setTrashTodos(JSON.parse(savedTrashTodos));
    }
  }, []);

  const handleRestoreClick = (index: number) => {
    setSelectedIndex(index);
    setRestoreModalOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    setDeleteModalOpen(true);
  };

  const restoreTodo = () => {
    if (selectedIndex !== null) {
      const restoredTodo = trashTodos[selectedIndex];
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      const updatedTodos = [...todos, restoredTodo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      const updatedTrashTodos = trashTodos.filter(
        (_, i) => i !== selectedIndex
      );
      setTrashTodos(updatedTrashTodos);
      localStorage.setItem("trashTodos", JSON.stringify(updatedTrashTodos));

      setRestoreModalOpen(false);
      setSelectedIndex(null);
    }
  };

  const permanentlyDeleteTodo = () => {
    if (selectedIndex !== null) {
      const updatedTrashTodos = trashTodos.filter(
        (_, i) => i !== selectedIndex
      );
      setTrashTodos(updatedTrashTodos);
      localStorage.setItem("trashTodos", JSON.stringify(updatedTrashTodos));

      setDeleteModalOpen(false);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Trash</h1>
      <ul className="list-disc">
        {trashTodos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="flex-grow">{todo.title}</span>
            <ReButton onClick={() => handleRestoreClick(index)} />
            <RemoveButton onClick={() => handleDeleteClick(index)} />
          </li>
        ))}
      </ul>

      <ConfirmRestoreModal
        isOpen={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        onConfirm={restoreTodo}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={permanentlyDeleteTodo}
      />
    </div>
  );
};

export default TrashPage;
