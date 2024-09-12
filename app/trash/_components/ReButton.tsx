import { MdRestore } from "react-icons/md";

interface ReButtonProps {
  onClick: () => void;
}

const ReButton = ({ onClick }: ReButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-2 py-1 rounded flex items-center mr-2"
    >
      <MdRestore size={20} />
      <span className="ml-1">Restore</span>
    </button>
  );
};

export default ReButton;
