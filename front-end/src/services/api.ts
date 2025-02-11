import axios from "axios";
import { Todo } from "../types/dtos";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  try {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      phone,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user.");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid credentials");
  }
};

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchTodos = async () => {
  const { data } = await api.get<Todo[]>("/todos", {
    headers: getAuthHeader(),
  });
  return data;
};

export const addTodo = async (todo: Omit<Todo, "_id">) => {
  const { data } = await api.post<Todo>("/todos", todo, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`, { headers: getAuthHeader() });
};

export const toggleTodoStatus = async (
  id: string,
  status: "COMPLETED" | "PENDING"
) => {
  const { data } = await api.patch(
    `/todos/${id}`,
    { status: status.toUpperCase() },
    { headers: getAuthHeader() }
  );
  return data;
};

export default api;
