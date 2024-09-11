"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoTrash, IoArrowUndo } from "react-icons/io5";

interface DeletedTodo {
  title: string;
  index: number;
}

const TrashPage = () => {
  const [deletedTodos, setDeletedTodos] = useState<DeletedTodo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedDeletedTodos = localStorage.getItem("deletedTodos");
    if (storedDeletedTodos) {
      setDeletedTodos(JSON.parse(storedDeletedTodos));
    }
  }, []);

  const handleRestore = (index: number) => {
    const todoToRestore = deletedTodos.find((todo) => todo.index === index);
    if (todoToRestore) {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.push({
          title: todoToRestore.title,
          description: "",
          priority: 1,
        });
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      const updatedDeletedTodos = deletedTodos.filter(
        (todo) => todo.index !== index
      );
      localStorage.setItem("deletedTodos", JSON.stringify(updatedDeletedTodos));
      setDeletedTodos(updatedDeletedTodos);

      router.push("/");
    }
  };

  const handleDelete = (index: number) => {
    const updatedDeletedTodos = deletedTodos.filter(
      (todo) => todo.index !== index
    );
    localStorage.setItem("deletedTodos", JSON.stringify(updatedDeletedTodos));
    setDeletedTodos(updatedDeletedTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trash</h1>
      <ul className="list-disc">
        {deletedTodos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="flex-grow">{todo.title}</span>
            <button
              onClick={() => handleRestore(todo.index)}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mr-2"
            >
              <IoArrowUndo size={20} />
              <span className="ml-2">Restore</span>
            </button>
            <button
              onClick={() => handleDelete(todo.index)}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <IoTrash size={20} />
              <span className="ml-2">Delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrashPage;
