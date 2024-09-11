import React, { useState } from "react";
import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";
import Modal from "./Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface TodoListProps {
  todos: {
    title: string;
    description: string;
    priority: number;
    dueDate?: string;
    dueTime?: string;
    allDay?: boolean;
  }[];
  updateTodo: (
    index: number,
    updatedTodo: {
      title: string;
      description: string;
      priority: number;
      dueDate?: string;
      dueTime?: string;
      allDay?: boolean;
    }
  ) => void;
  removeTodo: (index: number) => void;
}

const TodoList = ({ todos, updateTodo, removeTodo }: TodoListProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
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

  const handleRemoveClick = (index: number) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      removeTodo(deleteIndex);
      setDeleteIndex(null);
    }
    setDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-100 px-4 rounded shadow-md">
      <ul className="list-none divide-y divide-gray-300">
        {todos.map((todo, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <div className="flex flex-col flex-grow min-w-0">
              {" "}
              {/* タイトルと日時の領域 */}
              {/* タイトルが画面に収まらない場合に改行する */}
              <span className="font-semibold break-words whitespace-pre-wrap">
                {todo.title}
              </span>
              {todo.dueDate && (
                <span className="text-gray-500 text-sm">
                  {todo.allDay
                    ? todo.dueDate
                    : `${todo.dueDate} ${todo.dueTime}`}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {" "}
              {/* ボタンの領域 */}
              <EditButton onClick={() => handleEditClick(index)} />
              <RemoveButton onClick={() => handleRemoveClick(index)} />
            </div>
          </li>
        ))}
      </ul>
      {modalOpen && (
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
