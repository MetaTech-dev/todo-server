import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

// use for testing purposes only
export const inspectToken = (
  req: RequireAuthProp<Request>,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log("token", token);
  next();
};
