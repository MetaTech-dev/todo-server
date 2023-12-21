import { Request, Response } from "express";
import BaseController from "../BaseController";
import UserService from "./UserService";

export default class UserController extends BaseController {
  list = async (_req: Request, res: Response) => {
    try {
      const users = await UserService.list();

      return this.success(res, users);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      }
      const user = await UserService.getOne(id);

      return this.success(res, user);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const userId = req.auth?.payload.sub;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } 
      else if (id !== userId) {
        return this.unAuthorized(res, { message: "You can only update your own user" });
      }

      await UserService.update(id, body);

      const updatedUser = await UserService.getOne(id);

      return this.created(res, updatedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  updateRoles = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleIds } = req.body;

    try {
      if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (!roleIds) {
        return this.badRequest(res, { message: "Roles are required" });
      }

      const assignedUser = await UserService.updateRoles(id, roleIds);

      return this.created(res, assignedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  }
}
