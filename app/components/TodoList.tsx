import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";
import { useState } from "react";
import Modal from "./Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface TodoListProps {
  todos: { title: string; description: string; priority: number }[];
  updateTodo: (
    index: number,
    updatedTodo: { title: string; description: string; priority: number }
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
    priority: number
  ) => {
    if (editIndex !== null) {
      updateTodo(editIndex, { title, description, priority });
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
    <div>
      <ul className="list-disc">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="flex-grow">{todo.title}</span>
            <EditButton onClick={() => handleEditClick(index)} />
            <RemoveButton onClick={() => handleRemoveClick(index)} />
          </li>
        ))}
      </ul>

      {editIndex !== null && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddTodo={handleSaveTodo}
          initialTitle={todos[editIndex].title}
          initialDescription={todos[editIndex].description}
          initialPriority={todos[editIndex].priority}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TodoList;
