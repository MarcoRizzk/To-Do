import { Request, Response, NextFunction } from "express";
import TodoModel from "../models/todo.model.js";
import { TodoService } from "./todo.service.js";
import { NotFoundException } from "../exceptions/index.js";

const todoService: TodoService = new TodoService();

export const createTodo = async (req: Request, res: Response) => {
  const todo = await todoService.createTodo(req.userId, req.body);
  res
    .status(201)
    .json({ message: "Todo item created successfully.", id: todo._id });
};

export const getUserTodos = async (req: Request, res: Response) => {
  const userId = req.userId;
  const todos = await todoService.getUserTodos(userId);
  res.json(todos);
};

export const updateTodoStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.id;
  const todo = await TodoModel.findById(todoId);
  if (!todo) return next(new NotFoundException("Todo not found"));
  const {status} =req.body
  await todoService.updateTodoStatus(todoId, status);
  res.json("Todo updated successfully.");
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.id;
  const todo = await TodoModel.findById(req.params.id);
  if (!todo) return next(new NotFoundException("Todo not found"));

  await todoService.deleteTodo(todoId);
  res.json({ message: "Todo deleted successfully" });
};
