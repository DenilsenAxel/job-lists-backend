import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendRes } from "../utils/api";

export const authenticateJWT = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET!, (err) => {
      if (err) {
        return sendRes(res, 403, "Unauthorized User!");
      }

      next();
    });
  } else {
    return sendRes(res, 401, "No token provided!");
  }
};
