import { Router } from "express";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validations/register.schema.js";
import { loginSchema } from "../validations/login.schema.js";
import AuthController from "../auth/auth.controller.js";

const router = Router();
const authController: AuthController = new AuthController();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
