import { Request, Response, NextFunction } from "express";
import { claimCheck, InsufficientScopeError } from "express-oauth2-jwt-bearer";

const checkPermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions as string[];

      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        permissions.includes(requiredPermission)
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });
    permissionCheck(req, res, next);
  };
};

export default checkPermissions;
