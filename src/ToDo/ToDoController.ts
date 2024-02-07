import { Request, Response } from "express";
import BaseController from "../BaseController";
import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";
import ToDoService from "./ToDoService";
import clerkClient, { RequireAuthProp } from "@clerk/clerk-sdk-node";

export default class ToDoController extends BaseController {
  list = async (req: RequireAuthProp<Request>, res: Response) => {
    // TODO: Fix this, waiting on clerk support
    // @ts-ignore
    const { userId, orgId } = req.auth;
    try {
      const toDos = await ToDoService.list({ orgId, userId });
      return this.success(res, toDos);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  create = async (req: RequireAuthProp<Request>, res: Response) => {
    const { body }: { body: CreateToDoDTO } = req;
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
      } else if (!body.description) {
        return this.badRequest(res, { message: "Description is required" });
      } else if (typeof body.description !== "string") {
        return this.badRequest(res, {
          message: "Description must be a string",
        });
      } else if (body.description && body.description.length > 65535) {
        return this.badRequest(res, {
          message: "Description must be less than 65535 characters",
        });
      } else if (body.createdDate && typeof body.createdDate !== "string") {
        return this.badRequest(res, {
          message: "Created Date must be a string",
        });
      } else if (body.dueDate && typeof body.dueDate !== "string") {
        return this.badRequest(res, { message: "Due Date must be a string" });
      } else if (!body.priority) {
        return this.badRequest(res, { message: "Priority is required" });
      } else if (
        body.priority &&
        !["low", "medium", "high"].includes(body.priority)
      ) {
        return this.badRequest(res, {
          message: "Priority must be low, medium, or high",
        });
      } else if (!body.statusId) {
        return this.badRequest(res, { message: "Status ID is required" });
      } else if (typeof body.statusId !== "number") {
        return this.badRequest(res, { message: "Status ID must be a number" });
      } else if (body.assigneeUserId) {
        const assigneeUser = await clerkClient.users.getUser(
          body.assigneeUserId
        );
        if (!assigneeUser) {
          return this.notFound(res, {
            message: "Assignee User not found",
          });
        }
      } else if (!body.authorUserId) {
        return this.badRequest(res, {
          message: "Only God can create a toDo without a human vessel",
        });
      }

      // if on personal account, no orgId exists, userId is used in its place
      if (orgId) {
        body.orgId = orgId;
      } else {
        body.orgId = userId;
      }

      const newToDo = await ToDoService.create(body);
      [];

      return this.created(res, newToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  update = async (req: RequireAuthProp<Request>, res: Response) => {
    const { body }: { body: UpdateToDoDTO } = req;
    const { id } = req.params;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      } else if (body.title && typeof body.title !== "string") {
        return this.badRequest(res, { message: "Title must be a string" });
      } else if (body.description && typeof body.description !== "string") {
        return this.badRequest(res, {
          message: "Description must be a string",
        });
      } else if (body.description && body.description.length > 65535) {
        return this.badRequest(res, {
          message: "Description must be less than 65535 characters",
        });
      } else if (body.createdDate && typeof body.createdDate !== "string") {
        return this.badRequest(res, {
          message: "Created Date must be a string",
        });
      } else if (body.dueDate && typeof body.dueDate !== "string") {
        return this.badRequest(res, { message: "Due Date must be a string" });
      } else if (
        body.priority &&
        !["low", "medium", "high"].includes(body.priority)
      ) {
        return this.badRequest(res, {
          message: "Priority must be low, medium, or high",
        });
      } else if (body.statusId && typeof body.statusId !== "number") {
        return this.badRequest(res, { message: "Status ID must be a number" });
      } else if (!id) {
        return this.badRequest(res, { message: "ID is required" });
      } else if (id && isNaN(Number(id))) {
        return this.badRequest(res, { message: "ID must be a number" });
      } else if (body.assigneeUserId) {
        const assigneeUser = await clerkClient.users.getUser(
          body.assigneeUserId
        );
        if (!assigneeUser) {
          return this.notFound(res, {
            message: "Assignee User not found",
          });
        }
      } else if (!body.authorUserId) {
        return this.badRequest(res, {
          message: "Only God can update a toDo without a human vessel",
        });
      }
      const updatedToDo = await ToDoService.update(body);

      return this.created(res, updatedToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  updateAll = async (req: RequireAuthProp<Request>, res: Response) => {
    const { body }: { body: UpdateToDoDTO[] } = req;
    try {
      if (Object.keys(body).length === 0) {
        return this.badRequest(res, { message: "request body is required" });
      }
      const updatedToDos = await ToDoService.updateAll(body);

      return this.created(res, updatedToDos);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  remove = async (req: RequireAuthProp<Request>, res: Response) => {
    const { id } = req.params;
    try {
      if (isNaN(Number(id))) {
        return this.badRequest(res, { message: "ID must be a number" });
      }
      await ToDoService.remove(Number(id));

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
      const theToDo = await ToDoService.getOne(Number(id));
      if (!theToDo) {
        return this.notFound(res, { message: "ToDo not found" });
      }
      // this validates that the user is authorized to view the toDo
      if (
        // TODO: Fix this, waiting on clerk support
        // @ts-ignore
        !(theToDo.orgId === req.auth.orgId || theToDo.orgId === req.auth.userId)
      ) {
        return this.unAuthorized(res, { message: "Unauthorized" });
      }

      return this.success(res, theToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
