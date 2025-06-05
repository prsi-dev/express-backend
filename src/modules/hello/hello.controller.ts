import { Request, Response } from "express";
import { getHelloMessage } from "./hello.service";

export const getHello = (req: Request, res: Response): void => {
  const fullPath = req.baseUrl + req.path;
  const response = getHelloMessage(fullPath);
  res.json(response);
};
