import { IoIosAdd } from "react-icons/io";

interface TodoButtonProps {
  onOpenModal: () => void;
}

const TodoButton = ({ onOpenModal }: TodoButtonProps) => {
  return (
    <button
      onClick={onOpenModal}
      className="fixed bottom-4 right-4 bg-pink-600 text-white p-4 rounded-full border flex items-center justify-center -z-10"
    >
      <IoIosAdd size={20} />
      <span className="ml-2">Add</span>
    </button>
  );
};

export default TodoButton;
