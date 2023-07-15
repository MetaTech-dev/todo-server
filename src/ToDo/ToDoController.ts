import { Request, Response } from "express";
import BaseController from "../BaseController"
import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";
import ToDoService from "./ToDoService";


export default class ToDoController extends BaseController {
    list = (_req: Request, res: Response) => {
        const toDos = ToDoService.list();

        return this.success(res, toDos);
    }

    create = (req: Request, res: Response) => {
        const { body } : {body: CreateToDoDTO} = req;
        console.log('ToDo create body', body);
        
        const newToDo = ToDoService.create(body);

        return this.created(res, newToDo);
    }

    update = (req: Request, res: Response) => {
        const { body } : {body: UpdateToDoDTO} = req;
        console.log('ToDo update body', body);
     
        const updatedToDo = ToDoService.update(body);

        return this.created(res, updatedToDo);
    }

    remove = (req: Request, res: Response) => {
        const { id } = req.params;
        console.log('ToDo delete id', id);

        const deleted = ToDoService.remove(id);

        if (!deleted) {
            return this.notFound(res, { message: 'ToDo not found' });
        }

        return this.noContent(res);
    }

    getOne = (req: Request, res: Response) => {
        const { id } = req.params;
        console.log('ToDo getOne id', id);
        
        const theToDo = ToDoService.getOne(id);

        if (!theToDo) {
            return this.notFound(res, { message: 'ToDo not found' });
        }

        return this.success(res, theToDo);
    }
}
