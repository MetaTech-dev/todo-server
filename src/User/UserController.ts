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
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      }

      await UserService.update(id, body);

      const updatedUser = await UserService.getOne(id);

      return this.created(res, updatedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  assignRoles = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roles } = req.body;

    try {
      if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (!roles) {
        return this.badRequest(res, { message: "Roles are required" });
      }

      const assignedUser = await UserService.assignRoles(id, roles);

      return this.created(res, assignedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  removeRoles = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roles } = req.body;

    try {
      if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (!roles) {
        return this.badRequest(res, { message: "Roles are required" });
      }

      const assignedUser = await UserService.removeRoles(id, roles);

      return this.created(res, assignedUser);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
