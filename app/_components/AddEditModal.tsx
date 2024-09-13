import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    dueTime?: string,
    allDay?: boolean
  ) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: number;
  initialDueDate?: string;
  initialDueTime?: string;
  initialAllDay?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  onAddTodo,
  initialTitle = "",
  initialDescription = "",
  initialPriority = 4,
  initialDueDate = "",
  initialDueTime = "",
  initialAllDay = false,
}: ModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [dueTime, setDueTime] = useState(initialDueTime);
  const [allDay, setAllDay] = useState(initialAllDay);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setDueDate(initialDueDate);
    setDueTime(initialDueTime);
    setAllDay(initialAllDay);
  }, [
    initialTitle,
    initialDescription,
    initialPriority,
    initialDueDate,
    initialDueTime,
    initialAllDay,
  ]);

  const handleSaveClick = () => {
    if (title.trim() && priority >= 1 && priority <= 4) {
      onAddTodo(title, description, priority, dueDate, dueTime, allDay);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setDueDate(initialDueDate);
    setDueTime(initialDueTime);
    setAllDay(initialAllDay);
  };

  const isFormValid = title.trim() !== "" && priority >= 1 && priority <= 4;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-10/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Todo</h2>
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
            <option value={4}>4(high)</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1(row)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Due Time</label>
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="border p-2 w-full"
            disabled={allDay}
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="mr-4">All day</label>
          <Switch
            onChange={(checked) => setAllDay(checked)}
            checked={allDay}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveClick}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded flex items-center ${
              isFormValid
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaCheck size={16} />
            <span className="ml-2">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
