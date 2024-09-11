"use client";

import { useRouter } from "next/navigation";
import { IoTrash } from "react-icons/io5";

interface NavMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMenu = ({ setIsOpen }: NavMenuProps) => {
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(false);
    router.push("/trash");
  };

  return (
    <div className="p-6 bg-white text-black rounded mx-10 w-full flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="text-lg flex items-center justify-center gap-4"
      >
        <IoTrash size={24} />
        Go to Trash
      </button>
    </div>
  );
};

export default NavMenu;
