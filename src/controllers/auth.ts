import { Response, Request } from "express";
import { IUser, User } from "../models/User";
import { sendRes } from "../utils/api";
import { ITokenRes } from "../interfaces/auth";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await User.create({
      username,
      password,
    });
    const payload: ITokenRes = {
      token: user.getSignedToken(),
    };
    sendRes(res, 200, "Login Success", payload);
  } catch (error: any) {
    sendRes(res, 500, error.message, null);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendRes(res, 400, "Please provide a valid email and Password", null);
    return;
  }

  try {
    const user: IUser | null = await User.findOne({ username }).select("+password");
    if (!user) {
      sendRes(res, 401, "Invalid Credentials", null);
      return;
    }
    const isMatch: boolean = await user.matchPassword(password);
    if (!isMatch) {
      sendRes(res, 401, "Invalid Credentials", null);
      return;
    }
    const payload: ITokenRes = {
      token: user.getSignedToken(),
    };
    sendRes(res, 200, "Login Success", payload);
  } catch (error: any) {
    sendRes(res, 500, error.message, null);
  }
};
