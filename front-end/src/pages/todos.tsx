import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import TodoItem from "../components/todo-item";
import { Todo } from "./../types/dtos";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../services/api";

const Todos = () => {
  const auth = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (auth?.user) loadTodos();
  }, [auth?.user]);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleAddTodo = async () => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter description:");
    const dueDate = prompt("Enter due date (YYYY-MM-DD):");

    if (title && description && dueDate) {
      setIsLoading(true);
      try {
        const newTodo = await addTodo({
          title,
          description,
          dueDate,
          status: "PENDING",
        });
        setTodos([...todos, newTodo]);
        await loadTodos();
      } catch (error) {
        console.error("Error adding todo", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: "COMPLETED" | "PENDING"
  ) => {
    setIsLoading(true);
    try {
      await toggleTodoStatus(
        id,
        currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED"
      );
      await loadTodos();
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-xl">
      <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>

      {isLoading && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16"></div>
        </div>
      )}

      <div className="flex gap-2 mb-4 rounded-xl">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 border rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onToggleStatus={handleToggleStatus}
          />
        ))
      ) : (
        <p className="text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default Todos;
