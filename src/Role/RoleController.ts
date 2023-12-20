import { Request, Response } from "express";
import BaseController from "../BaseController";
import RoleService from "./RoleService";

export default class RoleController extends BaseController {
  list = async (_req: Request, res: Response) => {
    try {
      console.log("in controller");
      const roles = await RoleService.list();
      console.log("roles in controller fuck", roles);
      return this.success(res, roles);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
