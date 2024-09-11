"use client";

import { IoTrash } from "react-icons/io5";
import { useRouter } from "next/navigation";

const TrashButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/trash");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
    >
      <IoTrash size={24} />
    </button>
  );
};

export default TrashButton;
