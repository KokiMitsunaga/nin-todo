"use client";

import { useState, useEffect } from "react";
import TodoButton from "./_components/TodoButton";
import TodoList from "./_components/TodoList";
import AddEditModal from "./_components/AddEditModal";
import TrashButton from "./_components/TrashButton";
import CategoryBar from "./_components/CategoryBar";
import { Todo } from "./_types/types";
import CategoryEditModal from "./_components/CategoryEditModal";
import SortSelectBox from "./_components/SortSelectBox";
import SortToggleButton from "./_components/SrotToggleButton";

const TodoPage = () => {
  const [todos, setTodos] = useState<{ [key: string]: Todo[] }>({});
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>(["TODO"]);
  const [selectedCategory, setSelectedCategory] = useState("TODO");
  const [categoryEditModalOpen, setCategoryEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState("created");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    // ローカルストレージからTodo、カテゴリー、ゴミ箱のTodoを取得
    const savedTodos = localStorage.getItem("todos");
    const savedCategories = localStorage.getItem("categories");
    const savedTrashTodos = localStorage.getItem("trashTodos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedCategories) {
      const loadedCategories = JSON.parse(savedCategories);
      setCategories([
        "TODO",
        ...loadedCategories.filter((cat: string) => cat !== "TODO"),
      ]);
    }
    if (savedTrashTodos) {
      setTrashTodos(JSON.parse(savedTrashTodos));
    }
  }, []);

  // Todoが変更されたときにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // カテゴリーが変更されたときにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(
      "categories",
      JSON.stringify(categories.filter((cat) => cat !== "TODO"))
    );
  }, [categories]);

  // ゴミ箱のTodoが変更されたときにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("trashTodos", JSON.stringify(trashTodos));
  }, [trashTodos]);

  // Todoを追加する処理
  const addTodo = (
    title: string,
    description: string,
    priority: number,
    dueDate?: string,
    dueTime?: string,
    allDay?: boolean
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      dueTime,
      allDay,
      category: selectedCategory,
    };

    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: [...(prevTodos[selectedCategory] || []), newTodo],
    }));
    setSelectedTodos([]);
    setEditId(null);
  };

  // Todoを更新する処理
  const updateTodo = (id: string, updatedTodo: Todo) => {
    const previousCategory = todos[selectedCategory].find(
      (todo) => todo.id === id
    )?.category;

    if (updatedTodo.category !== previousCategory) {
      setTodos((prevTodos) => ({
        ...prevTodos,
        [previousCategory!]: prevTodos[previousCategory!].filter(
          (todo) => todo.id !== id
        ),
        [updatedTodo.category]: [
          ...(prevTodos[updatedTodo.category] || []),
          updatedTodo,
        ],
      }));
    } else {
      setTodos((prevTodos) => ({
        ...prevTodos,
        [selectedCategory]: prevTodos[selectedCategory].map((todo) =>
          todo.id === id ? updatedTodo : todo
        ),
      }));
    }
    setEditId(null);
  };

  // Todoを削除する処理
  const removeTodo = (id: string) => {
    const removedTodo = todos[selectedCategory].find((todo) => todo.id === id);
    if (removedTodo) {
      setTrashTodos([
        ...trashTodos,
        { ...removedTodo, category: selectedCategory },
      ]);
      setTodos((prevTodos) => ({
        ...prevTodos,
        [selectedCategory]: prevTodos[selectedCategory].filter(
          (todo) => todo.id !== id
        ),
      }));
    }
  };

  // 選択されたTodo項目を削除する処理
  const removeSelectedTodos = () => {
    const updatedTodos = todos[selectedCategory].filter(
      (todo) => !selectedTodos.includes(todo)
    );
    const updatedTrash = selectedTodos.map((todo) => ({
      ...todo,
      category: selectedCategory,
    }));
    setTrashTodos([...trashTodos, ...updatedTrash]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: updatedTodos,
    }));
    setSelectedTodos([]);
  };

  // カテゴリーを追加する処理
  const handleAddCategory = (category: string) => {
    if (categories.includes(category)) {
      setErrorMessage("このカテゴリー名は既に存在します。");
      return;
    }
    if (category === "TODO") return;
    setCategories((prevCategories) => [...prevCategories, category]);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [category]: [],
    }));
    setSelectedCategory(category);
  };

  // カテゴリーを編集する処理
  const handleEditCategory = (newName: string) => {
    if (categoryToEdit === "TODO") return;
    if (categories.includes(newName)) {
      setErrorMessage("このカテゴリー名は既に存在します。");
      return;
    }
    if (categoryToEdit) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat === categoryToEdit ? newName : cat))
      );
      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };
        newTodos[newName] = newTodos[categoryToEdit];
        delete newTodos[categoryToEdit];
        return newTodos;
      });
      setSelectedCategory(newName);
      setCategoryToEdit(null);
    }
  };

  // カテゴリーを削除する処理
  const handleDeleteCategory = () => {
    if (categoryToEdit === "TODO") return;
    if (categoryToEdit) {
      const todosToMoveToTrash = (todos[categoryToEdit] || []).map((todo) => ({
        ...todo,
        category: "TODO",
      }));
      setTrashTodos([...trashTodos, ...todosToMoveToTrash]);

      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== categoryToEdit)
      );
      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };
        delete newTodos[categoryToEdit];
        return newTodos;
      });
      setCategoryToEdit(null);
      setSelectedCategory(categories[0] || "TODO");
    }
  };

  // Todo項目をソートする処理
  const sortTodos = (todosList: Todo[], sortMethod: string) => {
    // 日付なしのものがうまくソートできなかったため、仮に先の日付を登録
    const FUTURE_DATE = new Date("2999-12-31").getTime();

    let sortedTodos: Todo[];

    switch (sortMethod) {
      case "dueDate":
        sortedTodos = todosList.slice().sort((a, b) => {
          const dateA = a.dueDate
            ? new Date(`${a.dueDate}T${a.dueTime || "00:00:00"}`).getTime()
            : FUTURE_DATE;
          const dateB = b.dueDate
            ? new Date(`${b.dueDate}T${b.dueTime || "00:00:00"}`).getTime()
            : FUTURE_DATE;
          return sortOrderAsc ? dateA - dateB : dateB - dateA;
        });
        break;
      case "priority":
        sortedTodos = todosList
          .slice()
          .sort((a, b) =>
            sortOrderAsc ? b.priority - a.priority : a.priority - b.priority
          );
        break;
      case "created":
      default:
        sortedTodos = todosList
          .slice()
          .sort((a, b) =>
            sortOrderAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
          );
        break;
    }

    return sortedTodos;
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onAddCategory={handleAddCategory}
        onSelectCategory={setSelectedCategory}
        onEditCategory={(category) => {
          setCategoryToEdit(category);
          setCategoryEditModalOpen(true);
        }}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <div className="flex justify-end my-4">
        <SortToggleButton
          sortOrderAsc={sortOrderAsc}
          toggleSortOrder={() => setSortOrderAsc(!sortOrderAsc)}
        />
        <SortSelectBox
          selectedSort={sortMethod}
          onChange={(newSortMethod) => {
            setSortMethod(newSortMethod);
            setSortOrderAsc(true);
          }}
        />
      </div>
      <TodoList
        todos={sortTodos(todos[selectedCategory] || [], sortMethod)}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        setSelectedTodos={setSelectedTodos}
        categories={categories}
      />
      <div className="fixed bottom-4 right-4 flex gap-3">
        <TrashButton
          selectedTodos={selectedTodos}
          onConfirmDelete={removeSelectedTodos}
        />
        <TodoButton onOpenModal={() => setModalOpen(true)} />
      </div>
      <AddEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTodo={addTodo}
        categories={categories}
        isEditMode={false}
        initialCategory={
          editId
            ? todos[selectedCategory]?.find((todo) => todo.id === editId)
                ?.category
            : "TODO"
        }
      />
      <CategoryEditModal
        isOpen={categoryEditModalOpen}
        onClose={() => setCategoryEditModalOpen(false)}
        category={categoryToEdit}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default TodoPage;
