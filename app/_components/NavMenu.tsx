"use client";

import { IoTrash } from "react-icons/io5";
import { FaHome, FaLightbulb } from "react-icons/fa";
import NavButton from "./NavButton";

interface NavMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMenu = ({ setIsOpen }: NavMenuProps) => {
  return (
    <div className="p-6 bg-white text-black rounded shadow-lg mx-10 w-full flex flex-col gap-6">
      <NavButton
        icon={<FaHome size={24} />}
        label="Home"
        route="/"
        setIsOpen={setIsOpen}
      />
      <hr className="w-full border-t border-gray-300" />

      <NavButton
        icon={<IoTrash size={24} />}
        label="Trash"
        route="/trash"
        setIsOpen={setIsOpen}
      />
      <hr className="w-full border-t border-gray-300" />

      <NavButton
        icon={<FaLightbulb size={24} />}
        label="How To"
        route="/howto"
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default NavMenu;
