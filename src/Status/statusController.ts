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
    const { body }: { body: CreateStatusDTO } = req;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!body.title) {
        return this.badRequest(res, { message: "Title is required" });
      } else if (typeof body.title !== "string") {
        return this.badRequest(res, { message: "Title must be a string" });
      }
      const newStatus = await StatusService.create(body);

      return this.created(res, newStatus);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  update = async (req: Request, res: Response) => {
    const { body }: { body: UpdateStatusDTO } = req;
    const { id } = req.params;

    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (id && isNaN(Number(id))) {
        return this.badRequest(res, { message: "ID must be a number" });
      } else if (body.title && typeof body.title !== "string") {
        return this.badRequest(res, { message: "Title must be a string" });
      } else if (!body.title) {
        return this.badRequest(res, {
          message: "Title must be at least 1 character",
        });
      }

      const updatedStatus = await StatusService.update(body);

      return this.created(res, updatedStatus);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (isNaN(Number(id))) {
        return this.badRequest(res, { message: "ID must be a number" });
      }
      await StatusService.remove(Number(id));

      return this.noContent(res);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (isNaN(Number(id))) {
        return this.badRequest(res, { message: "ID must be a number" });
      }
      const theStatus = await StatusService.getOne(Number(id));

      if (!theStatus) {
        return this.notFound(res, { message: "Status not found" });
      }
      return this.success(res, theStatus);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
