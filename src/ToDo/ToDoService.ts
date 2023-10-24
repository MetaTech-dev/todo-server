import prisma from "../../prisma";
import { Prisma, ToDo } from "@prisma/client";
// import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";

// interface ToDo {
//   title: string;
//   description: string;
//   author?: string;
//   createdDate?: string;
//   dueDate?: string;
//   assignee?: string;
//   priority: string;
//   status: string;
//   id: number;
// }

// const toDos: ToDo[] = [
//   {
//     title: "do the dishes",
//     description: "there are a lot of dishes to do",
//     author: "Megan",
//     createdDate: "2021-01-01",
//     dueDate: "2021-01-02",
//     assignee: "Megan",
//     priority: "high",
//     status: "ready",
//     id: "1",
//   },
//   {
//     title: "do the laundry",
//     description: "there are a lot of laundry to do",
//     author: "Megan",
//     createdDate: "2021-01-01",
//     dueDate: "2021-01-02",
//     assignee: "Megan",
//     priority: "high",
//     status: "ready",
//     id: "2",
//   },
// ];

export default class ToDoService {
  static list = async () => {
    try {
      const allToDos = await prisma.toDo.findMany({
        orderBy: {
          createdDate: "desc",
        },
      });
      return allToDos;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static create = async (
    toDo: Prisma.ToDoCreateInput
  ): Promise<ToDo | Prisma.PrismaClientKnownRequestError> => {
    console.log("hello from ToDoService.create");
    try {
      const createdTodo = await prisma.toDo.create({
        data: toDo,
      });

      return createdTodo;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  //   static update = (toDo: UpdateToDoDTO) => {
  //     // TODO: replace this with a call to the database

  //     const theToDo = toDos.find((toDo) => toDo.id === toDo.id);

  //     if (!theToDo) {
  //       return null;
  //     }

  //     const updatedToDo = {
  //       ...theToDo,
  //       ...toDo,
  //     };

  //     return updatedToDo;
  //   };

  //   static remove = (id: string) => {
  //     // TODO: replace this with a call to the database

  //     const theToDo = toDos.find((toDo) => toDo.id === id);

  //     if (!theToDo) {
  //       return false;
  //     }

  //     return true;
  //   };

  //   static getOne = (id: string) => {
  //     // TODO: replace this with a call to the database

  //     const theToDo = toDos.find((toDo) => toDo.id === id);

  //     if (!theToDo) {
  //       return null;
  //     }

  //     return theToDo;
  //   };
}
