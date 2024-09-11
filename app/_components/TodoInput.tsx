interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
}

const TodoInput = ({ newTodo, setNewTodo }: TodoInputProps) => {
  return (
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      className="border p-2 mr-2 flex-grow"
      placeholder="Add a new task"
    />
  );
};

export default TodoInput;
