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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(
      "categories",
      JSON.stringify(categories.filter((cat) => cat !== "TODO"))
    );
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("trashTodos", JSON.stringify(trashTodos));
  }, [trashTodos]);

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
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    setTodos((prevTodos) => ({
      ...prevTodos,
      [selectedCategory]: prevTodos[selectedCategory].map((todo) =>
        todo.id === id ? updatedTodo : todo
      ),
    }));
  };

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
      setCategoryToEdit(null);
    }
  };

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

  const sortTodos = (todosList: Todo[], sortMethod: string) => {
    const FUTURE_DATE = new Date("2999-12-31").getTime();

    let sortedTodos: Todo[];

    switch (sortMethod) {
      case "dueDate":
        sortedTodos = todosList.slice().sort((a, b) => {
          const dateA =
            a.dueDate && !isNaN(Date.parse(a.dueDate + " " + (a.dueTime || "")))
              ? Date.parse(a.dueDate + " " + (a.dueTime || ""))
              : FUTURE_DATE;
          const dateB =
            b.dueDate && !isNaN(Date.parse(b.dueDate + " " + (b.dueTime || "")))
              ? Date.parse(b.dueDate + " " + (b.dueTime || ""))
              : FUTURE_DATE;
          return dateA - dateB;
        });
        break;
      case "priority":
        sortedTodos = todosList.slice().sort((a, b) => b.priority - a.priority);
        break;
      case "created":
      default:
        sortedTodos = todosList
          .slice()
          .sort((a, b) => a.id.localeCompare(b.id));
        break;
    }

    return sortedTodos;
  };

  return (
    <div className="container mx-auto p-4">
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
        <SortSelectBox selectedSort={sortMethod} onChange={setSortMethod} />
      </div>
      <TodoList
        todos={sortTodos(todos[selectedCategory] || [], sortMethod)}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        setSelectedTodos={setSelectedTodos}
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
      />
      {categoryEditModalOpen && (
        <CategoryEditModal
          isOpen={categoryEditModalOpen}
          onClose={() => setCategoryEditModalOpen(false)}
          category={categoryToEdit}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default TodoPage;
