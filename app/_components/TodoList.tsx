import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Todo } from "../_types/types";

interface TodoListProps {
  todos: Todo[];
  updateTodo: (index: number, updatedTodo: Todo) => void;
  removeTodo: (index: number) => void;
  setSelectedTodos: (selectedTodos: Todo[]) => void;
}

const TodoList = ({
  todos,
  updateTodo,
  removeTodo,
  setSelectedTodos,
}: TodoListProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const selectedTodos = selectedIds.map((id) => todos[id]);
    setSelectedTodos(selectedTodos);
  }, [selectedIds, todos, setSelectedTodos]);

  const handleItemClick = (index: number) => {
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleSaveTodo = (
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    dueTime?: string,
    allDay?: boolean
  ) => {
    if (editIndex !== null) {
      updateTodo(editIndex, {
        title,
        description,
        priority,
        dueDate,
        dueTime,
        allDay,
      });
      setEditIndex(null);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds
          .filter((id) => id !== deleteIndex)
          .map((id) => (id > deleteIndex ? id - 1 : id))
      );
      removeTodo(deleteIndex);
      setDeleteIndex(null);
    }
    setDeleteModalOpen(false);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(index)
        ? prevSelectedIds.filter((id) => id !== index)
        : [...prevSelectedIds, index]
    );
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [todos.length]);

  return (
    <div className="bg-gray-100 px-4 rounded shadow-md">
      <ul className="list-none divide-y divide-gray-300">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="py-2 flex justify-between items-center cursor-pointer text-lg"
            onClick={() => handleItemClick(index)}
          >
            <input
              type="checkbox"
              className="mr-4 w-5 h-5"
              checked={selectedIds.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-col flex-grow min-w-0">
              <span className="font-semibold break-words whitespace-pre-wrap text-lg">
                {todo.title}
              </span>
              {todo.dueDate && (
                <span className="text-gray-500 text-base">
                  {todo.allDay
                    ? todo.dueDate
                    : `${todo.dueDate} ${todo.dueTime}`}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      {modalOpen && editIndex !== null && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddTodo={handleSaveTodo}
          initialTitle={todos[editIndex!].title}
          initialDescription={todos[editIndex!].description}
          initialPriority={todos[editIndex!].priority}
          initialDueDate={todos[editIndex!].dueDate}
          initialDueTime={todos[editIndex!].dueTime}
          initialAllDay={todos[editIndex!].allDay}
        />
      )}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TodoList;
