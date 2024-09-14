export default function CategorySection() {
  return (
    <section id="category" className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">2. カテゴリー</h2>
      <div className="space-y-4">
        <div id="category-create">
          <h3 className="text-xl font-semibold">作成</h3>
          <ul className="list-disc ml-5">
            <li>
              画面上部のカテゴリーバーのプラスボタン
              からカテゴリーを作成できます。
            </li>
            <li>既存のカテゴリー名は使えません。</li>
            <li>
              「TODO」というカテゴリーは固定であり、編集や削除はできません。
            </li>
          </ul>
        </div>
        <div id="category-edit">
          <h3 className="text-xl font-semibold">編集</h3>
          <ul className="list-disc ml-5">
            <li>選択中のカテゴリーを再度クリックして編集が可能です。</li>
            <li>ここでも既存のカテゴリー名に編集することはできません。</li>
          </ul>
        </div>
        <div id="category-delete">
          <h3 className="text-xl font-semibold">削除</h3>
          <ul className="list-disc ml-5">
            <li>
              選択中のカテゴリーを削除するには、カテゴリー編集画面左側の削除ボタンを押します。
            </li>
            <li>一度削除すると、元に戻すことはできません。</li>
          </ul>
        </div>
        <div id="category-move">
          <h3 className="text-xl font-semibold">カテゴリーの移動</h3>
          <ul className="list-disc ml-5">
            <li>カテゴリーが複数ある場合に使用可能です。</li>
            <li>
              カテゴリーの移動をしたい項目をタップし、カテゴリー欄から移動したいカテゴリーを選ぶことで移動ができます。
            </li>
          </ul>
        </div>
        <div id="category-tips">
          <h3 className="text-xl font-semibold">おすすめの使い方</h3>
          <ul className="list-disc ml-5">
            <li>
              ジャンル分け:
              買い物、課題、旅行などに分けて管理することで視認性が向上します。
            </li>
            <li>難易度分け: 難易度に応じてタスクを整理すると効率的です。</li>
            <li>
              カンバン分け:
              「未実施」「実施中」「完了」と分けて管理がしやすくなります。
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
