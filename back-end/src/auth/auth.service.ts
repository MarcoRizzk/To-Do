import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export class AuthService {
  async login(id: string, email: string, name:string): Promise<{ access_token: string }> {
    const payload = { id, email, name };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    return { access_token: token };
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    phone: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
  }
}
