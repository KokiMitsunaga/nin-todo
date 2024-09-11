import { IoIosAdd } from "react-icons/io";

interface TodoButtonProps {
  addTodo: () => void;
}

const TodoButton = ({ addTodo }: TodoButtonProps) => {
  return (
    <button
      onClick={addTodo}
      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
    >
      <IoIosAdd size={20} />
      <span>Add</span>
    </button>
  );
};

export default TodoButton;
