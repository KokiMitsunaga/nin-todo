export default function TodoSection() {
  return (
    <section id="todo" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">1. Todo</h2>
      <div className="space-y-4">
        <div id="todo-create">
          <h3 className="text-xl font-semibold">作成</h3>
          <ul className="list-disc ml-5">
            <li>右下のAddボタンからTodoを作成できます。</li>
            <li>作成時にTitleとPriorityの入力が必須です。</li>
            <li>Priorityは4が高く、1 が低く設定されています。</li>
          </ul>
        </div>
        <div id="todo-edit">
          <h3 className="text-xl font-semibold">編集</h3>
          <ul className="list-disc ml-5">
            <li>編集したい項目をタップすることで編集ができます。</li>
            <li>ここでもTitleとPriorityの入力が必須です。</li>
          </ul>
        </div>
        <div id="todo-delete">
          <h3 className="text-xl font-semibold">削除</h3>
          <ul className="list-disc ml-5">
            <li>
              削除したい項目のチェックボックスにチェックを入れ、右下のゴミ箱マークを押して削除できます。
            </li>
            <li>複数の項目をまとめて削除することも可能です。</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
