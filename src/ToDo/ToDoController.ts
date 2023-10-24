import { Request, Response } from "express";
import BaseController from "../BaseController";
import {
  CreateToDoDTO,
  // UpdateToDoDTO
} from "./toDoTypes";
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
      console.log("ToDo create body", body);

      const newToDo = await ToDoService.create(body);

      return this.created(res, newToDo);
    } catch (err) {
      return this.badRequest(res, err);
    }
  };

  // update = (req: Request, res: Response) => {
  //   const { body }: { body: UpdateToDoDTO } = req;
  //   console.log("ToDo update body", body);

  //   const updatedToDo = ToDoService.update(body);

  //   return this.created(res, updatedToDo);
  // };

  // remove = (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   console.log("ToDo delete id", id);

  //   const deleted = ToDoService.remove(id);

  //   if (!deleted) {
  //     return this.notFound(res, { message: "ToDo not found" });
  //   }

  //   return this.noContent(res);
  // };

  // getOne = (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   console.log("ToDo getOne id", id);

  //   const theToDo = ToDoService.getOne(id);

  //   if (!theToDo) {
  //     return this.notFound(res, { message: "ToDo not found" });
  //   }

  //   return this.success(res, theToDo);
  // };
}
