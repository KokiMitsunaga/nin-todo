import { IoIosAdd } from "react-icons/io";

interface TodoButtonProps {
  onOpenModal: () => void;
}

const TodoButton = ({ onOpenModal }: TodoButtonProps) => {
  return (
    <button
      onClick={onOpenModal}
      className="bg-pink-600 text-white p-4 rounded-full border flex items-center justify-center"
    >
      <IoIosAdd size={20} />
      <span className="ml-2">作成</span>
    </button>
  );
};

export default TodoButton;
