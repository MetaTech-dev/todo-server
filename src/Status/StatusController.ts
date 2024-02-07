import { Request, Response } from "express";
import BaseController from "../BaseController";
import { CreateStatusDTO, UpdateStatusDTO } from "./statusTypes";
import StatusService from "./StatusService";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";

export default class StatusController extends BaseController {
  list = async (req: RequireAuthProp<Request>, res: Response) => {
    // TODO: Fix this, waiting on clerk support
    // @ts-ignore
    const { userId, orgId } = req.auth;

    try {
      const statuses = await StatusService.list({ orgId, userId });

      return this.success(res, statuses);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  create = async (req: RequireAuthProp<Request>, res: Response) => {
    const { body }: { body: CreateStatusDTO } = req;
    // TODO: Fix this, waiting on clerk support
    // @ts-ignore
    const { userId, orgId } = req.auth;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!body.title) {
        return this.badRequest(res, { message: "Title is required" });
      } else if (typeof body.title !== "string") {
        return this.badRequest(res, { message: "Title must be a string" });
      }
      // if orgId is present, use it, otherwise use userId
      if (orgId) {
        body.orgId = orgId;
      } else {
        body.orgId = userId;
      }

      const newStatus = await StatusService.create(body);

      return this.created(res, newStatus);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  update = async (req: RequireAuthProp<Request>, res: Response) => {
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

  updateAll = async (req: RequireAuthProp<Request>, res: Response) => {
    const { body }: { body: UpdateStatusDTO[] } = req;

    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (!Array.isArray(body)) {
        return this.badRequest(res, {
          message: "request body must be an array",
        });
      } else if (body.length === 0) {
        return this.badRequest(res, {
          message: "request body must not be empty",
        });
      }

      const updatedStatuses = await StatusService.updateAll(body);

      return this.success(res, updatedStatuses);
    } catch (e) {
      return this.badRequest(res, e);
    }
  };

  remove = async (req: RequireAuthProp<Request>, res: Response) => {
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

  getOne = async (req: RequireAuthProp<Request>, res: Response) => {
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
