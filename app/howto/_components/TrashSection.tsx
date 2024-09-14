export default function TrashSection() {
  return (
    <section id="trash" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">4. ゴミ箱</h2>
      <div className="space-y-4">
        <div id="trash-restore">
          <h3 className="text-xl font-semibold">復元</h3>
          <ul className="list-disc ml-5">
            <li>復元したい項目のRestoreボタンを押すことで復元が可能です。</li>
            <li>復元先のカテゴリーを選択することができます。</li>
          </ul>
        </div>
        <div id="trash-delete">
          <h3 className="text-xl font-semibold">削除</h3>
          <ul className="list-disc ml-5">
            <li>
              Todoリストと同様、チェックボックスにチェックを入れてゴミ箱マークを押すことで削除できます。
            </li>
            <li>まとめて削除することも可能です。</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
