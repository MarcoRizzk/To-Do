import { Router } from "express";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createTodo,
  deleteTodo,
  getUserTodos,
  updateTodoStatus,
} from "../todo/todo.controller.js";
import { createTodoSchema } from "../validations/create-todo.schema.js";
import { updateTodoSchema } from "../validations/update-todo.schema.js";

const router = Router();

router.post("/", authMiddleware, validate(createTodoSchema), createTodo);
router.get("/", authMiddleware, getUserTodos);
router.patch("/:id", authMiddleware, validate(updateTodoSchema), updateTodoStatus);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
