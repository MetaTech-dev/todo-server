import { Request, Response } from "express";
import BaseController from "../BaseController";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import UserService from "./UserService";

export default class UserController extends BaseController {
  list = async (req: RequireAuthProp<Request>, res: Response) => {
    const orgId = req.query.orgId?.toString();
    if (!orgId) {
      return this.badRequest(res, { message: "orgId is required" });
    }
    try {
      const users = await UserService.list({ orgId });

      return this.success(res, users);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  getOne = async (req: RequireAuthProp<Request>, res: Response) => {
    const { userId } = req.params;
    const orgId = req.query.orgId?.toString();
    try {
      if (!userId) {
        return this.badRequest(res, { message: "userId is required" });
      }

      const user = await UserService.getOne({ userId, orgId });

      return this.success(res, user);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  update = async (req: RequireAuthProp<Request>, res: Response) => {
    const { userId } = req.params;
    const body = req.body;

    const authUserId = req.auth.userId;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!userId) {
        return this.badRequest(res, { message: "userId is required" });
      } else if (authUserId !== userId) {
        return this.unAuthorized(res, {
          message: "You can only update your own user",
        });
      }

      const updatedUser = await UserService.update({ userId, body });

      return this.created(res, updatedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  updateRole = async (req: RequireAuthProp<Request>, res: Response) => {
    const { userId } = req.params;
    const orgId = req.query.orgId?.toString();
    const { role } = req.body;
    try {
      if (!userId) {
        return this.badRequest(res, { message: "userId is required" });
      } else if (!role) {
        return this.badRequest(res, { message: "role is required" });
      } else if (!orgId) {
        return this.badRequest(res, { message: "orgId is required" });
      }

      const updatedUser = UserService.updateRole({ userId, role, orgId });

      return this.created(res, updatedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
