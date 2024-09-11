"use client";

import { useState, useEffect } from "react";
import TodoButton from "./components/TodoButton";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";

const TodoPage = () => {
  const [todos, setTodos] = useState<
    { title: string; description: string; priority: number }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string, priority: number) => {
    setTodos([...todos, { title, description, priority }]);
  };

  const updateTodo = (
    index: number,
    updatedTodo: { title: string; description: string; priority: number }
  ) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex">
        <TodoButton onOpenModal={() => setModalOpen(true)} />
      </div>
      <TodoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
};

export default TodoPage;
