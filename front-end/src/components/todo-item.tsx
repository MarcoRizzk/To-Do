import { Todo } from "../types/dtos";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: "COMPLETED" | "PENDING") => void;
}

const TodoItem = ({ todo, onDelete, onToggleStatus }: TodoItemProps) => {
  return (
    <div className="p-4 border rounded mb-3 shadow-sm bg-white flex justify-between items-center">
      <div>
        <h3 className={`text-lg font-semibold ${todo.status === "COMPLETED" ? "line-through text-green-600" : ""}`}>
          {todo.title}
        </h3>
        <p className="text-gray-600">{todo.description}</p>
        <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggleStatus(todo._id, todo.status)}
          className={`px-3 py-1 rounded ${
            todo.status === "COMPLETED" ? "bg-yellow-400" : "bg-blue-500"
          } text-white`}
        >
          {todo.status === "COMPLETED" ? "Mark Pending" : "Mark Done"}
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
