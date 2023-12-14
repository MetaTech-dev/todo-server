import { NextFunction, Request, Response } from "express";

export const inspectToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log("token", token);
  next();
};
