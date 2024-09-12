"use client";

import { useState, useEffect } from "react";
import TodoButton from "./_components/TodoButton";
import TodoList from "./_components/TodoList";
import AddEditModal from "./_components/AddEditModal";
import TrashButton from "./_components/TrashButton";
import CategoryBar from "./_components/CategoryBar";
import { Todo } from "./_types/types";
import CategoryEditModal from "./_components/CategoryEditModal"; // 新規追加

const TodoPage = () => {
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryEditModalOpen, setCategoryEditModalOpen] = useState(false); // 追加
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null); // 追加

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedCategories = localStorage.getItem("categories");
    const savedTrashTodos = localStorage.getItem("trashTodos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
      setSelectedCategory(JSON.parse(savedCategories)[0] || "");
    }
    if (savedTrashTodos) {
      setTrashTodos(JSON.parse(savedTrashTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("trashTodos", JSON.stringify(trashTodos));
  }, [trashTodos]);

  const addTodo = (
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    dueTime?: string,
    allDay?: boolean
  ) => {
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: [
        ...(prevTodos[selectedCategory] || []),
        {
          title,
          description,
          priority,
          dueDate,
          dueTime,
          allDay,
          category: selectedCategory,
        },
      ],
    }));
    setSelectedTodos([]);
  };

  const updateTodo = (index: number, updatedTodo: Todo) => {
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: prevTodos[selectedCategory].map((todo, i) =>
        i === index ? updatedTodo : todo
      ),
    }));
  };

  const removeTodo = (index: number) => {
    const removedTodo = todos[selectedCategory][index];
    setTrashTodos([
      ...trashTodos,
      { ...removedTodo, category: selectedCategory },
    ]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: prevTodos[selectedCategory].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const removeSelectedTodos = () => {
    const updatedTodos = todos[selectedCategory].filter(
      (todo) => !selectedTodos.includes(todo)
    );
    const updatedTrash = selectedTodos.map((todo) => ({
      ...todo,
      category: selectedCategory,
    }));
    setTrashTodos([...trashTodos, ...updatedTrash]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: updatedTodos,
    }));
    setSelectedTodos([]);
  };

  const handleAddCategory = (category: string) => {
    setCategories((prevCategories) => [...prevCategories, category]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [category]: [],
    }));
    setSelectedCategory(category);
  };

  const handleEditCategory = (newName: string) => {
    if (categoryToEdit) {
      // カテゴリー名の変更
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat === categoryToEdit ? newName : cat))
      );
      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };
        newTodos[newName] = newTodos[categoryToEdit];
        delete newTodos[categoryToEdit];
        return newTodos;
      });
      setCategoryToEdit(null);
    }
  };

  const handleDeleteCategory = () => {
    if (categoryToEdit) {
      // カテゴリー削除時にそのカテゴリーのTODOをゴミ箱に移動
      setTrashTodos([...trashTodos, ...(todos[categoryToEdit] || [])]);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== categoryToEdit)
      );
      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };
        delete newTodos[categoryToEdit];
        return newTodos;
      });
      setCategoryToEdit(null);
      setSelectedCategory(categories[0] || "");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onAddCategory={handleAddCategory}
        onSelectCategory={setSelectedCategory}
        onEditCategory={(category) => {
          setCategoryToEdit(category); // 追加
          setCategoryEditModalOpen(true); // 追加
        }}
      />

      <TodoList
        todos={todos[selectedCategory] || []}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        setSelectedTodos={setSelectedTodos}
      />

      <div className="fixed bottom-4 right-4 flex gap-3">
        <TrashButton
          selectedTodos={selectedTodos}
          onConfirmDelete={removeSelectedTodos}
        />
        <TodoButton onOpenModal={() => setModalOpen(true)} />
      </div>

      <AddEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTodo={addTodo}
      />

      {categoryEditModalOpen && (
        <CategoryEditModal
          isOpen={categoryEditModalOpen}
          onClose={() => setCategoryEditModalOpen(false)}
          category={categoryToEdit}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
    </div>
  );
};

export default TodoPage;
