import { MdRestore } from "react-icons/md";

interface ReButtonProps {
  onClick: () => void;
}

const ReButton = ({ onClick }: ReButtonProps) => {
  return (
    <button onClick={onClick} className="text-green-500 flex items-center">
      <MdRestore size={20} />
    </button>
  );
};

export default ReButton;
