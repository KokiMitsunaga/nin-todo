interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button onClick={onClick} className="text-red-500 hover:underline">
      Delete
    </button>
  );
};

export default RemoveButton;
