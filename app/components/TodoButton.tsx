interface TodoButtonProps {
  addTodo: () => void;
}

const TodoButton = ({ addTodo }: TodoButtonProps) => {
  return (
    <button
      onClick={addTodo}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add
    </button>
  );
};

export default TodoButton;
