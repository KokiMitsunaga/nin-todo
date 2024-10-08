import React, { useState, useEffect } from "react";
import AddEditModal from "./AddEditModal";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import { Todo } from "../_types/types";

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: string, updatedTodo: Todo) => void;
  removeTodo: (id: string) => void;
  setSelectedTodos: (selectedTodos: Todo[]) => void;
  categories: string[];
}

const TodoList = ({
  todos,
  updateTodo,
  removeTodo,
  setSelectedTodos,
  categories,
}: TodoListProps) => {
  // 編集中のTodo項目のIDを管理
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // 削除対象のTodo項目のIDを管理
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // 選択されたTodo項目のIDのリストを管理
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // TODOリストが変更されたときに選択されたTodo項目のIDリストをリセット
  useEffect(() => {
    setSelectedIds([]);
  }, [todos.length]);

  const handleItemClick = (id: string) => {
    setEditId(id);
    setModalOpen(true);
  };

  // Todo項目を保存する関数
  const handleSaveTodo = (
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    dueTime?: string,
    allDay?: boolean,
    category?: string
  ) => {
    if (editId) {
      const todoToUpdate = todos.find((todo) => todo.id === editId);
      updateTodo(editId, {
        id: editId,
        title,
        description,
        priority,
        dueDate,
        dueTime,
        allDay,
        category: category || todoToUpdate!.category,
      });
      setEditId(null);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== deleteId)
      );
      removeTodo(deleteId);
      setDeleteId(null);
    }
    setDeleteModalOpen(false);
  };

  // チェックボックスの状態が変更されたときに選択されたTodoを更新する関数
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];

      const selectedTodos = newSelectedIds.map(
        (selectedId) => todos.find((todo) => todo.id === selectedId)!
      );

      setSelectedTodos(selectedTodos);
      return newSelectedIds;
    });
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [todos.length]);

  return (
    <div className="bg-gray-100 px-4 rounded shadow-md">
      <ul className="list-none divide-y divide-gray-300">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="py-2 flex justify-between items-center cursor-pointer text-lg"
            onClick={() => handleItemClick(todo.id)}
          >
            <input
              type="checkbox"
              className="mr-4 w-5 h-5"
              checked={selectedIds.includes(todo.id)}
              onChange={() => handleCheckboxChange(todo.id)}
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
      {modalOpen && editId !== null && (
        <AddEditModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddTodo={handleSaveTodo}
          initialTitle={todos.find((todo) => todo.id === editId)!.title}
          initialDescription={
            todos.find((todo) => todo.id === editId)!.description
          }
          initialPriority={todos.find((todo) => todo.id === editId)!.priority}
          initialDueDate={todos.find((todo) => todo.id === editId)!.dueDate}
          initialDueTime={todos.find((todo) => todo.id === editId)!.dueTime}
          initialAllDay={todos.find((todo) => todo.id === editId)!.allDay}
          initialCategory={todos.find((todo) => todo.id === editId)!.category}
          categories={categories}
          isEditMode={true}
        />
      )}
      {deleteModalOpen && (
        <ConfirmDeleteItemModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TodoList;
