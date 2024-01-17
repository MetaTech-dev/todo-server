import { Request, Response } from "express";
import BaseController from "../BaseController";
import RoleService from "./RoleService";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";

export default class RoleController extends BaseController {
  list = async (_req: RequireAuthProp<Request>, res: Response) => {
    try {
      const roles = await RoleService.list();
      return this.success(res, roles);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
