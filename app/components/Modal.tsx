import React, { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (title: string, description: string, priority: number) => void;
}

const Modal = ({ isOpen, onClose, onAddTodo }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  const handleAddClick = () => {
    if (title.trim() && priority >= 1 && priority <= 4) {
      onAddTodo(title, description, priority);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority(1);
  };

  const isFormValid = title.trim() !== "" && priority >= 1 && priority <= 4;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-10/12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Todo</h2>
          <button onClick={handleClose} className="text-red-400">
            <FaXmark size={20} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Title <span className="text-red-500 text-sm">(required)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Priority <span className="text-red-500 text-sm">(required)</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="border p-2 w-full"
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddClick}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded flex items-center ${
              isFormValid
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            <FaCheck size={16} />
            <span className="ml-1">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
