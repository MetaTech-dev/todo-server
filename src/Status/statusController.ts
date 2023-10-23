import { Request, Response } from "express";
import BaseController from "../BaseController";
import { CreateStatusDTO, UpdateStatusDTO } from "./statusTypes";
import StatusService from "./statusService";

export default class StatusController extends BaseController {
  list = async (_req: Request, res: Response) => {
    console.log("controller");
    const statuses = await StatusService.list();

    return this.success(res, statuses);
  };

  create = (req: Request, res: Response) => {
    const { body }: { body: CreateStatusDTO } = req;
    console.log("Status create body", body);

    const newStatus = StatusService.create(body);

    return this.created(res, newStatus);
  };

  update = (req: Request, res: Response) => {
    const { body }: { body: UpdateStatusDTO } = req;
    console.log("Status update body", body);

    const updatedStatus = StatusService.update(body);

    return this.created(res, updatedStatus);
  };

  remove = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("Status delete id", id);

    const deleted = StatusService.remove(id);

    if (!deleted) {
      return this.notFound(res, { message: "Status not found" });
    }

    return this.noContent(res);
  };

  getOne = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("Status getOne id", id);

    const theStatus = StatusService.getOne(id);

    if (!theStatus) {
      return this.notFound(res, { message: "Status not found" });
    }

    return this.success(res, theStatus);
  };
}
