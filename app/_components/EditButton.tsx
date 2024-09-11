import { MdEdit } from "react-icons/md";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button onClick={onClick} className="text-pink-400 flex items-center ml-4">
      <MdEdit size={20} />
    </button>
  );
};

export default EditButton;
