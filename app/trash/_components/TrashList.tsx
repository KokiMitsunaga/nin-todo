import React from "react";
import { Todo } from "@/app/_types/types";
import ReButton from "./ReButton";

interface TrashListProps {
  trashTodos: Todo[];
  selectedTodos: Todo[];
  handleCheckboxChange: (todo: Todo, isChecked: boolean) => void;
  handleRestoreClick: (index: number) => void;
}

const TrashList = ({
  trashTodos,
  selectedTodos,
  handleCheckboxChange,
  handleRestoreClick,
}: TrashListProps) => {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded shadow-md">
      <ul className="list-none divide-y divide-gray-300">
        {trashTodos.map((todo, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <input
              type="checkbox"
              className="mr-4 w-5 h-5"
              checked={selectedTodos.includes(todo)}
              onChange={(e) => handleCheckboxChange(todo, e.target.checked)}
            />
            <span className="flex-grow">{todo.title}</span>
            <ReButton onClick={() => handleRestoreClick(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrashList;
