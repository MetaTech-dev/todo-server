import { Request, Response, NextFunction } from "express";
import { InsufficientScopeError } from "express-oauth2-jwt-bearer";

export const permissionErrorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof InsufficientScopeError) {
    const message = "Permission denied";

    response.status(error.status).json({ message });

    return;
  }
  next;
};
