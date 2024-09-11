"use client";

import { useState, useEffect } from "react";
import Title from "./components/Title";
import TodoInput from "./components/TodoInput";
import TodoButton from "./components/TodoButton";
import TodoList from "./components/TodoList";

const TodoPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const updateTodo = (index: number, newTodo: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = newTodo;
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <Title />
      <div className="mb-4 flex">
        <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} />
        <TodoButton addTodo={addTodo} />
      </div>
      <TodoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
    </div>
  );
};

export default TodoPage;
