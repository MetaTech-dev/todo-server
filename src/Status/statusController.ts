import { Request, Response } from "express";
import BaseController from "../BaseController";
import { CreateStatusDTO, UpdateStatusDTO } from "./statusTypes";
import StatusService from "./statusService";

export default class StatusController extends BaseController {
  list = async (_req: Request, res: Response) => {
    try {
      const statuses = await StatusService.list();

      return this.success(res, statuses);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { body }: { body: CreateStatusDTO } = req;
      if (!body) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!body.title) {
        return this.badRequest(res, { message: "Title is required" });
      } else if (!body.position) {
        return this.badRequest(res, { message: "Position is required" });
      }

      const newStatus = await StatusService.create(body);

      return this.created(res, newStatus);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { body }: { body: UpdateStatusDTO } = req;
      if (!body) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!body.id) {
        return this.badRequest(res, { message: "ID is required" });
      }

      const updatedStatus = await StatusService.update(body);

      return this.created(res, updatedStatus);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return this.badRequest(res, { message: "ID is required" });
    } else if (isNaN(Number(id))) {
      return this.badRequest(res, { message: "ID must be a number" });
    }

    try {
      // const deleted =
      await StatusService.remove(Number(id));

      // if (!deleted) {
      //   return this.notFound(res, { message: "Status not found" });
      // }

      return this.noContent(res);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };
}
