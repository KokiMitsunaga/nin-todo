import { IoIosAdd } from "react-icons/io";

interface TodoButtonProps {
  onOpenModal: () => void;
}

const TodoButton = ({ onOpenModal }: TodoButtonProps) => {
  return (
    <button
      onClick={onOpenModal}
      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
    >
      <IoIosAdd size={20} />
      <span className="ml-2">Add</span>
    </button>
  );
};

export default TodoButton;
