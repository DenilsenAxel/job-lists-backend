import { Response } from "express";

type IResCodes = 200 | 400 | 401 | 403 | 404 | 500;
type IStatus = "OK" | "Error";

export const sendRes = (res: Response, code: IResCodes, message: string, data?: any) => {
  const status: IStatus = code >= 400 ? "Error" : "OK";

  // sends the response
  res.status(code).json({
    code,
    status,
    message,
    data,
  });
};
