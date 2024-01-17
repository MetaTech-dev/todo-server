import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

const checkPermissions = (requiredPermissions: string[]) => {
  return async (
    req: RequireAuthProp<Request>,
    _res: Response,
    next: NextFunction
  ) => {
    const hasPermissions = requiredPermissions.every((requiredPermission) =>
      // TODO: Fix this, waiting on clerk support
      // @ts-ignore
      req.auth.orgPermissions.includes(`org:${requiredPermission}`)
    );
    if (!hasPermissions) {
      throw new Error("You do not have permission to perform this action");
    }

    next();
  };
};

export default checkPermissions;
