import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";
import { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface TodoListProps {
  todos: { title: string; description: string; priority: number }[];
  updateTodo: (index: number, title: string) => void;
  removeTodo: (index: number) => void;
}

const TodoList = ({ todos, updateTodo, removeTodo }: TodoListProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditValue(todos[index].title);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      updateTodo(editIndex, editValue);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <ul className="list-disc">
      {todos.map((todo, index) => (
        <li key={index} className="flex justify-between items-center mb-2">
          {editIndex === index ? (
            <div className="flex-grow flex items-center">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-1 mr-2 flex-grow"
              />
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white px-2 py-1 rounded flex items-center mr-2"
              >
                <FaCheck size={16} />
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
              >
                <FaXmark size={16} />
              </button>
            </div>
          ) : (
            <>
              <span className="flex-grow">{todo.title}</span>
              <EditButton onClick={() => handleEditClick(index)} />
              <RemoveButton onClick={() => removeTodo(index)} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
