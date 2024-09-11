import { MdEdit } from "react-icons/md";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button onClick={onClick} className="text-blue-500 flex items-center">
      <MdEdit size={20} />
    </button>
  );
};

export default EditButton;
