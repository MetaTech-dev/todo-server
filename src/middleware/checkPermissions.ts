import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

const checkPermissions = (requiredPermissions: string[]) => {
  return async (
    req: RequireAuthProp<Request>,
    _res: Response,
    next: NextFunction
  ) => {
    const orgId = req.query.orgId?.toString();
    if (orgId) {
      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        // TODO: Fix this, waiting on clerk support
        // @ts-ignore
        req.auth.orgPermissions?.includes(`org:${requiredPermission}`)
      );
      if (!hasPermissions) {
        return next(new Error("Unauthorized"));
      }
    }
    next();
  };
};

export default checkPermissions;
