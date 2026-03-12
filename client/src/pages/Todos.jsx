import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TasksList from "../components/TasksList/TasksList";
import FormTask from "../components/FormTask/FormTask";
import FilterButtons from "../components/FilterButtons/FilterButtons";
import { deleteTodo, getTodos, createTodo, updateTodo } from "../services/api";
import PaginationButtons from "../components/PaginatioButtons/PaginationButtons";

const createEmptyTask = {
  title: "",
  description: "",
  completed: false,
};

function Todos() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(createEmptyTask);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const loadTodos = useCallback(async () => {
    const data = await getTodos(page);
    setTasks(data.docs);
    setPages(data.pages);
  }, [page]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    loadTodos();
  }, [token, loadTodos, navigate]);

  const filteredList = tasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "active") return !item.completed;
    return true;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    if (!(newTask.title || "").trim() || !(newTask.description || "").trim())
      return;
    try {
      await createTodo(newTask);
      await loadTodos();
      setNewTask(createEmptyTask);
    } catch (err) {
      setError(err.message || "Failed to created task");
    }
  };

  const handleEdit = async (id, updated) => {
    try {
      const data = await updateTodo(id, updated);
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Úkolníček</h1>

        <button
          onClick={handleLogout}
          className="bg-red-200 text-black px-5 py-1 rounded hover:bg-red-600 transition hover:text-white"
        >
          Odhlásit se
        </button>
      </div>
      {/* FILTER */}
      <div className="flex justify-center">
        <FilterButtons setFilter={setFilter} filter={filter} />
      </div>
      {/* FORM */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <FormTask
          handleAdd={handleAdd}
          newTask={newTask}
          handleChange={handleChange}
        />
      </div>
      {/* TASK LIST */}
      <div className="flex flex-col gap-3">
        <TasksList
          data={filteredList}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      <PaginationButtons page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

export default Todos;
