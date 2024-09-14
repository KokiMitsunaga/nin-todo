import {
  HiOutlineSortDescending,
  HiOutlineSortAscending,
} from "react-icons/hi";

type SortToggleButtonProps = {
  sortOrderAsc: boolean;
  toggleSortOrder: () => void;
};

const SortToggleButton = ({
  sortOrderAsc,
  toggleSortOrder,
}: SortToggleButtonProps) => {
  return (
    // ボタンが押されているかどうかで画像を変更している
    <button onClick={toggleSortOrder} className="p-2">
      {sortOrderAsc ? (
        <HiOutlineSortDescending size={24} />
      ) : (
        <HiOutlineSortAscending size={24} />
      )}
    </button>
  );
};

export default SortToggleButton;
