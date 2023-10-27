import { Request, Response } from "express";
import BaseController from "../BaseController";
import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";
import ToDoService from "./ToDoService";

export default class ToDoController extends BaseController {
  list = async (_req: Request, res: Response) => {
    try {
      const toDos = await ToDoService.list();
      return this.success(res, toDos);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  create = async (req: Request, res: Response) => {
    const { body }: { body: CreateToDoDTO } = req;
    try {
      const newToDo = await ToDoService.create(body);

      return this.created(res, newToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { body }: { body: UpdateToDoDTO } = req;

      const updatedToDo = await ToDoService.update(body);

      return this.created(res, updatedToDo);
    } catch (err) {
      return this.badRequest(res, err);
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
      await ToDoService.remove(Number(id));

      // if (!deleted) {
      //   return this.notFound(res, { message: "ToDo not found" });
      // }

      return this.noContent(res);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return this.badRequest(res, { message: "ID is required" });
    } else if (isNaN(Number(id))) {
      return this.badRequest(res, { message: "ID must be a number" });
    }
    try {
      const theToDo = await ToDoService.getOne(Number(id));

      if (!theToDo) {
        return this.notFound(res, { message: "ToDo not found" });
      }

      return this.success(res, theToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };
}
