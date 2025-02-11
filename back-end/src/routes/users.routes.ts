import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import UsersController from "../users/users.controller.js";
import validate from "../middlewares/validate.js";
import { updateUserSchema } from "../validations/update-user.schema.js";

const router = Router();
const usersController: UsersController = new UsersController();

router.get("/:id", authMiddleware, usersController.getUserById);
router.patch(
  "/:id",
  authMiddleware,
  validate(updateUserSchema),
  usersController.updateUser
);

export default router;
