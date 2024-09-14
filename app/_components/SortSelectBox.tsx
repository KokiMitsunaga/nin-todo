"use client";

import { ChangeEvent } from "react";

interface SortSelectBoxProps {
  selectedSort: string;
  onChange: (sortMethod: string) => void;
}

const SortSelectBox = ({ selectedSort, onChange }: SortSelectBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      value={selectedSort}
      onChange={handleChange}
      className="border rounded p-2 border-pink-600 bg-white"
    >
      <option value="created">Creation Order</option>
      <option value="dueDate">Due Date</option>
      <option value="priority">Priority</option>
    </select>
  );
};

export default SortSelectBox;
