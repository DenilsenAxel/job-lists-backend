import express from "express";
import { login, register } from "../controllers/auth";

export default () => {
  const authRouter = express.Router();

  authRouter.post("/auth/register", register);
  authRouter.post("/auth/login", login);

  return authRouter;
};
