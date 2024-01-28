import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

const permissionsOnRoles = {
  "org:admin": [
    "org:create:status",
    "org:create:todo",
    "org:delete:status",
    "org:delete:todo",
    "org:read:status",
    "org:read:todo",
    "org:read:user",
    "org:update:status",
    "org:update:todo",
    "org:update:user",
    "org:update:userrole",
  ],
  "org:member": [
    "org:read:status",
    "org:read:todo",
    "org:read:user",
    "org:update:todo",
    "org:update:user",
  ],
};

const checkPermissions = (requiredPermissions: string[]) => {
  return async (
    req: RequireAuthProp<Request>,
    _res: Response,
    next: NextFunction
  ) => {
    // const reqOrgId = req.query.orgId?.toString();
    // TODO: Fix this, waiting on clerk support
    // @ts-ignore
    const { orgId: authOrgId, orgRole: authOrgRole } = req.auth;

    if (authOrgId) {
      // if (reqOrgId !== authOrgId) {
      //   return next(new Error("Unauthorized"));
      // }

      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        // TODO: Fix this, waiting on clerk support
        // @ts-ignore
        // req.auth.orgPermissions?.includes(`org:${requiredPermission}`)
        permissionsOnRoles[authOrgRole].includes(`org:${requiredPermission}`)
      );
      if (!hasPermissions) {
        return next(new Error("Unauthorized"));
      }
    }
    next();
  };
};

export default checkPermissions;
