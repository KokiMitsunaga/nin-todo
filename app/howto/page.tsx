import TodoSection from "./_components/TodoSection";
import CategorySection from "./_components/CategorySection";
import SortingSection from "./_components/SortingSection";
import TrashSection from "./_components/TrashSection";

export default function HowToPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">アプリの使い方</h1>
      <TodoSection />
      <CategorySection />
      <SortingSection />
      <TrashSection />
    </div>
  );
}
