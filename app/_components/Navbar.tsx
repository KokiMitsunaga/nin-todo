"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // すぐに表示するため初期値を true に変更

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {showNavbar && (
        <div
          className={`bg-pink-600 flex items-center justify-between fixed top-0 w-full z-50 h-16 transition-all duration-1000 ease-out border`}
        >
          <button
            onClick={handleClick}
            className="text-2xl font-bold m-4 text-white"
          >
            TO DO App
          </button>
          <div
            className="relative w-10 h-10 flex flex-col justify-center items-center cursor-pointer z-50 mr-2"
            onClick={toggleMenu}
          >
            <span
              className={`block w-6 h-0.5 ${
                isOpen ? "bg-black" : "bg-white"
              } mb-1.5 transition-all duration-500 ease-in-out ${
                isOpen ? "transform translate-y-1 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 ${
                isOpen ? "bg-black" : "bg-white"
              } transition-all duration-500 ease-in-out ${
                isOpen ? "transform -translate-y-1 -rotate-45" : ""
              }`}
            ></span>
          </div>
          <div
            className={`fixed top-0 right-0 w-full h-full bg-gray-50 transition-transform duration-500 ease-in-out z-10 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } flex items-center justify-center`}
          >
            {isOpen && <NavMenu setIsOpen={setIsOpen} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
