"use client";

import { useRouter } from "next/navigation";

const Title = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <button onClick={handleClick} className="text-2xl font-bold m-4">
      TO DO App
    </button>
  );
};

export default Title;
