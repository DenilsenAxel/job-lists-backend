import { Response } from "express";

type IResCodes = 200 | 400 | 401 | 403 | 404 | 500;
type IStatus = "OK" | "Error";

export function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json() as T;
    })
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

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
