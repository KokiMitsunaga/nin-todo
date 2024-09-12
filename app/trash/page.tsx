"use client";

import { useState, useEffect } from "react";
import TrashButton from "../_components/TrashButton";
import ConfirmRestoreModal from "./_components/ConfirmRestoreModal";
import TrashList from "./_components/TrashList";
import NoTrashMessage from "./_components/NoTrashMessage";
import { Todo } from "../_types/types";

const TrashPage = () => {
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTrashTodos = localStorage.getItem("trashTodos");
    const savedCategories = localStorage.getItem("categories");

    if (savedTrashTodos) {
      setTrashTodos(JSON.parse(savedTrashTodos));
    }

    let loadedCategories = savedCategories ? JSON.parse(savedCategories) : [];

    // "TODO"カテゴリーを必ず含める
    if (!loadedCategories.includes("TODO")) {
      loadedCategories = ["TODO", ...loadedCategories];
    }

    setCategories(loadedCategories);
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
      const todos = JSON.parse(localStorage.getItem("todos") || "{}");

      // カテゴリーが削除されている場合は"TODO"カテゴリーに復元
      const targetCategory =
        restoredTodo.category && categories.includes(restoredTodo.category)
          ? restoredTodo.category
          : "TODO"; // デフォルトのカテゴリを設定（例として 'TODO' を使用）

      const updatedTodos = {
        ...todos,
        [targetCategory]: [...(todos[targetCategory] || []), restoredTodo],
      };

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
      {trashTodos.length > 0 ? (
        <TrashList
          trashTodos={trashTodos}
          selectedTodos={selectedTodos}
          handleCheckboxChange={handleCheckboxChange}
          handleRestoreClick={handleRestoreClick}
        />
      ) : (
        <NoTrashMessage />
      )}

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
        categories={categories}
        currentCategory={
          selectedIndex !== null
            ? trashTodos[selectedIndex].category || null
            : null
        }
      />
    </div>
  );
};

export default TrashPage;
