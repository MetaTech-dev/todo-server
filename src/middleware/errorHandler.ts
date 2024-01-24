import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  _request: RequireAuthProp<Request>,
  response: Response,
  next: NextFunction
) => {
  if (error.name === "ClerkValidationError") {
    response.status(400).json({ error: error.message });
    return;
  }
  console.error("errorHandler error", error);
  response.json({ error: error.message });
  next();
};
