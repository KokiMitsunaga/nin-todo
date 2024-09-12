"use client";

import { useState, useEffect } from "react";
import ReButton from "./_components/ReButton";
import TrashButton from "../_components/TrashButton";
import ConfirmRestoreModal from "./_components/ConfirmRestoreModal";
import { Todo } from "../_types/types";

const TrashPage = () => {
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

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

  const handleCheckboxChange = (todo: Todo, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTodos([...selectedTodos, todo]);
    } else {
      setSelectedTodos(selectedTodos.filter((t) => t !== todo));
    }
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

  const permanentlyDeleteSelectedTodos = () => {
    const updatedTrashTodos = trashTodos.filter(
      (todo) => !selectedTodos.includes(todo)
    );
    setTrashTodos(updatedTrashTodos);
    localStorage.setItem("trashTodos", JSON.stringify(updatedTrashTodos));
    setSelectedTodos([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 px-4 py-2 rounded shadow-md">
        <ul className="list-none divide-y divide-gray-300">
          {trashTodos.map((todo, index) => (
            <li key={index} className="py-2 flex justify-between items-center">
              <input
                type="checkbox"
                className="mr-4 w-5 h-5"
                onChange={(e) => handleCheckboxChange(todo, e.target.checked)}
              />
              <span className="flex-grow">{todo.title}</span>
              <ReButton onClick={() => handleRestoreClick(index)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-4 right-4 flex gap-3">
        <TrashButton
          selectedTodos={selectedTodos}
          onConfirmDelete={permanentlyDeleteSelectedTodos}
        />
      </div>

      <ConfirmRestoreModal
        isOpen={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        onConfirm={restoreTodo}
      />
    </div>
  );
};

export default TrashPage;
