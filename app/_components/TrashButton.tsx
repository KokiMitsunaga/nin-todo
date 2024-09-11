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
      className="text-pink-600 bg-white p-4 rounded-full border flex items-center justify-center -z-10"
    >
      <IoTrash size={24} />
    </button>
  );
};

export default TrashButton;
