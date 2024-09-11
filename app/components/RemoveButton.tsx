import { MdDelete } from "react-icons/md";

interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button onClick={onClick} className="text-red-500 flex items-center pl-3">
      <MdDelete size={20} />
    </button>
  );
};

export default RemoveButton;
