export default function SortingSection() {
  return (
    <section id="sorting" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">3. 並び替え</h2>
      <div className="space-y-4">
        <div id="sorting-type">
          <h3 className="text-xl font-semibold">並び替えの種類</h3>
          <ul className="list-disc ml-5">
            <li>
              右上のセレクトボックスで、「作成順」「期限順」「優先度順」の並び替えができます。
            </li>
          </ul>
        </div>
        <div id="sorting-reverse">
          <h3 className="text-xl font-semibold">逆順</h3>
          <ul className="list-disc ml-5">
            <li>
              セレクトボックス横のトグルボタンで並び替えの順番を逆にすることができます。
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
