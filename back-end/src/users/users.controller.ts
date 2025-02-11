import { Request, Response, NextFunction } from "express";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../exceptions/index.js";
import { UsersService } from "./users.service.js";

const usersService: UsersService = new UsersService();

class UsersController {
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await usersService.getUserById(userId);
    if (!user) return next(new NotFoundException("User not found"));

    res.json(user);
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await usersService.getUserById(userId);

    if (!user) return next(new NotFoundException("User not found"));

    const isEmailAssociatedWithAnotherUser =
      await usersService.isEmailAssociatedWithAnotherUser(userId, user.email);

    if (isEmailAssociatedWithAnotherUser)
      return next(new BadRequestException("Cannot use this email."));

    await usersService.updateUser(userId, req.body);

    res.status(200).json({ message: "User updated successfully", id: user.id });
  };
}

export default UsersController;
