export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "PENDING";
  dueDate: string;
}
