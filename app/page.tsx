"use client";

import { useState, useEffect } from "react";
import TodoButton from "./_components/TodoButton";
import TodoList from "./_components/TodoList";
import AddEditModal from "./_components/AddEditModal";
import TrashButton from "./_components/TrashButton";
import CategoryBar from "./_components/CategoryBar";
import { Todo } from "./_types/types";

const TodoPage = () => {
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
        { title, description, priority, dueDate, dueTime, allDay },
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
    setTrashTodos([...trashTodos, removedTodo]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: prevTodos[selectedCategory].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const removeSelectedTodos = () => {
    setTrashTodos([...trashTodos, ...selectedTodos]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: prevTodos[selectedCategory].filter(
        (todo) => !selectedTodos.includes(todo)
      ),
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

  return (
    <div className="container mx-auto p-4">
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onAddCategory={handleAddCategory}
        onSelectCategory={setSelectedCategory}
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
    </div>
  );
};

export default TodoPage;
