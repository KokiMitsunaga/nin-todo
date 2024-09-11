"use client";

import { useState, useEffect } from "react";
import TodoButton from "./_components/TodoButton";
import TodoList from "./_components/TodoList";
import Modal from "./_components/Modal";
import TrashButton from "./_components/TrashButton";
import { Todo } from "./_types/types";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedTrashTodos = localStorage.getItem("trashTodos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedTrashTodos) {
      setTrashTodos(JSON.parse(savedTrashTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    setTodos([
      ...todos,
      { title, description, priority, dueDate, dueTime, allDay },
    ]);
  };

  const updateTodo = (index: number, updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index: number) => {
    const removedTodo = todos[index];
    setTrashTodos([...trashTodos, removedTodo]);
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <TodoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
      <div className="flex items-center justify-end gap-3">
        <TrashButton />
        <TodoButton onOpenModal={() => setModalOpen(true)} />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
};

export default TodoPage;
