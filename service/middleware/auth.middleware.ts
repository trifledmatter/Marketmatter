import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth";


export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token missing." });
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(403).json({ error: "Invalid or expired access token." });
  }

  req.user = {
    id: payload.userId,
    email: payload.email,
  };

  next();
};
