import Todo from "../models/todo.model.js";
import { CreateTodoDto } from "../validations/create-todo.schema.js";
import { UpdateTodoDto } from "../validations/update-todo.schema.js";

export class TodoService {
  async createTodo(userId: string, todoData: CreateTodoDto) {
    return Todo.create({
      userId,
      title: todoData.title,
      description: todoData.description,
      dueDate: todoData.dueDate,
    });
  }

  async getUserTodos(userId: string) {
    return await Todo.find({ userId: userId });
  }

  async searchTodos(userId: string, searchQuery: string) {
    return await Todo.find({
      userId,
      title: { $regex: searchQuery, $options: "i" },
    });
  }

  async updateTodoStatus(todoId: string, status:string) {
    return await Todo.updateOne({ _id: todoId }, {status}, {
      new: true,
    });
  }

  async deleteTodo(id: string) {
    return await Todo.deleteOne({ _id: id });
  }
}
