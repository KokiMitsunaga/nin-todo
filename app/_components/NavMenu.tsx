"use client";

import { IoTrash } from "react-icons/io5";
import { FaHome, FaLightbulb } from "react-icons/fa";
import NavButton from "./NavButton";

interface NavMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavMenu = ({ setIsOpen }: NavMenuProps) => {
  return (
    <div className="p-6 bg-white text-black rounded shadow-lg mx-10 w-full max-w-md h-full max-h-[80vh] flex flex-col gap-6 overflow-y-auto">
      <NavButton
        icon={
          <div className="text-pink-600">
            <FaHome size={24} />
          </div>
        }
        label="Todoリスト"
        route="/"
        setIsOpen={setIsOpen}
      />
      <hr className="w-full border-t border-gray-300" />

      <NavButton
        icon={
          <div className="text-pink-600">
            <IoTrash size={24} />
          </div>
        }
        label="ゴミ箱"
        route="/trash"
        setIsOpen={setIsOpen}
      />
      <hr className="w-full border-t border-gray-300" />

      <NavButton
        icon={
          <div className="text-pink-600">
            <FaLightbulb size={24} />
          </div>
        }
        label="使い方"
        route="/howto"
        setIsOpen={setIsOpen}
      />
      <div className="ml-6 space-y-2">
        <NavButton
          icon={null}
          label="1. Todo"
          route="/howto#todo"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="作成"
          route="/howto#todo-create"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="編集"
          route="/howto#todo-edit"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="削除"
          route="/howto#todo-delete"
          setIsOpen={setIsOpen}
        />

        <NavButton
          icon={null}
          label="2. カテゴリー"
          route="/howto#category"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="作成"
          route="/howto#category-create"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="編集"
          route="/howto#category-edit"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="削除"
          route="/howto#category-delete"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="カテゴリーの移動"
          route="/howto#category-move"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="おすすめの使い方"
          route="/howto#category-tips"
          setIsOpen={setIsOpen}
        />

        <NavButton
          icon={null}
          label="3. 並び替え"
          route="/howto#sorting"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="並び替えの種類"
          route="/howto#sorting-type"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="逆順"
          route="/howto#sorting-reverse"
          setIsOpen={setIsOpen}
        />

        <NavButton
          icon={null}
          label="4. ゴミ箱"
          route="/howto#trash"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="復元"
          route="/howto#trash-restore"
          setIsOpen={setIsOpen}
        />
        <NavButton
          icon={null}
          label="削除"
          route="/howto#trash-delete"
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default NavMenu;
