interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button onClick={onClick} className="text-blue-500 hover:underline mr-2">
      Edit
    </button>
  );
};

export default EditButton;
