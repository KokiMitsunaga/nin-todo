"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  route: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavButton = ({ icon, label, route, setIsOpen }: NavButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(false);
    router.push(route);

    const hash = route.split("#")[1];
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-lg flex items-center justify-start w-full gap-4"
    >
      {icon}
      {label}
    </button>
  );
};

export default NavButton;
