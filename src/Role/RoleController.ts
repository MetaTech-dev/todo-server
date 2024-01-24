import { Request, Response } from "express";
import BaseController from "../BaseController";
import RoleService from "./RoleService";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";

export default class RoleController extends BaseController {
  list = async (req: RequireAuthProp<Request>, res: Response) => {
    // TODO: Fix this, waiting on clerk support
    // @ts-ignore
    const { orgId } = req.auth;
    if (!orgId) {
      return this.badRequest(res, { message: "orgId is required" });
    }
    try {
      const roles = await RoleService.list({ orgId });
      return this.success(res, roles);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
