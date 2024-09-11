import RemoveButton from "./RemoveButton";
import EditButton from "./EditButton";
import { useState } from "react";

interface TodoListProps {
  todos: string[];
  updateTodo: (index: number, newTodo: string) => void;
  removeTodo: (index: number) => void;
}

const TodoList = ({ todos, updateTodo, removeTodo }: TodoListProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      updateTodo(editIndex, editValue);
      setEditIndex(null);
      setEditValue("");
    }
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
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <span className="flex-grow">{todo}</span>
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
