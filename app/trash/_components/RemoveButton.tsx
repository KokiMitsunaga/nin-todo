import { MdDelete } from "react-icons/md";

interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
    >
      <MdDelete size={20} />
      <span className="ml-1">Delete</span>
    </button>
  );
};

export default RemoveButton;
