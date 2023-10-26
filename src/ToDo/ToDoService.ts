import prisma from "../../prisma";
import { Prisma, ToDo } from "@prisma/client";
import { UpdateToDoDTO } from "./toDoTypes";

export default class ToDoService {
  static list = async (): Promise<
    ToDo[] | Prisma.PrismaClientKnownRequestError
  > => {
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

  static update = async (
    toDo: UpdateToDoDTO
  ): Promise<ToDo | Prisma.PrismaClientKnownRequestError> => {
    try {
      const updatedToDo = await prisma.toDo.update({
        where: {
          id: toDo.id,
        },
        data: toDo,
      });

      return updatedToDo;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  // TODO: handle errors for these

  static remove = async (
    id: number
  ): Promise<boolean | Prisma.PrismaClientKnownRequestError> => {
    try {
      await prisma.toDo.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static getOne = async (
    id: number
  ): Promise<ToDo | Prisma.PrismaClientKnownRequestError | null> => {
    try {
      const theOneToDo = await prisma.toDo.findUnique({
        where: {
          id,
        },
      });
      return theOneToDo;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };
}
