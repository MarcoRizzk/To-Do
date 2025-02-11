import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import { BadRequestException, NotFoundException } from "../exceptions/index.js";
import { AuthService } from "./auth.service.js";
import bcrypt from "bcrypt";

const authService: AuthService = new AuthService();

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return next(new BadRequestException("Email already exist"));

    const user = await authService.createUser(name, email, password, phone);

    res
      .status(201)
      .json({ message: "User registered successfully", id: user.id });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new NotFoundException("User not found"));

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return next(new BadRequestException("Invalid credentials"));

    const token = await authService.login(user._id.toString(), user.email, user.name);

    res.json(token);
  };
}

export default AuthController;
