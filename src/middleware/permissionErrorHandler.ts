import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const permissionErrorHandler = (
  error: any,
  _request: RequireAuthProp<Request>,
  response: Response,
  next: NextFunction
) => {
  console.error("permissionErrorHandler error", error);
  response.json({ error: error.message });
  next();
};
