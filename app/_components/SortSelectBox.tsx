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
      <option value="created">作成順</option>
      <option value="dueDate">期日順</option>
      <option value="priority">優先度順</option>
    </select>
  );
};

export default SortSelectBox;
