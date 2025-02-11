import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { extractTokenFromHeader } from "../utils/utils.js";
import {
  BadRequestException,
  UnauthorizedException,
} from "../exceptions/index.js";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = extractTokenFromHeader(req.headers);

  if (!token) {
    return next(new UnauthorizedException("Token not provided"));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return next(new BadRequestException("JWT secret not provided"));
    }

    const decoded: any = jwt.verify(token, jwtSecret);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return next(new UnauthorizedException("Unauthorized"));
  }
}
