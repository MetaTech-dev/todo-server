import prisma from "../../prisma";
import { Prisma, ToDo } from "@prisma/client";
import { CreateToDoDTO, UpdateToDoDTO } from "./toDoTypes";

export default class ToDoService {
  static list = async ({
    orgId,
    userId,
  }: {
    orgId?: string;
    userId?: string;
  }): Promise<ToDo[] | Prisma.PrismaClientKnownRequestError> => {
    try {
      const allToDos = await prisma.toDo.findMany({
        where: {
          orgId: orgId ? orgId : userId,
        },
        orderBy: {
          createdDate: "desc",
        },
      });
      return allToDos;
    } catch (err) {
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static create = async (
    toDo: CreateToDoDTO
  ): Promise<ToDo | Prisma.PrismaClientKnownRequestError> => {
    try {
      const createdTodo = await prisma.toDo.create({
        data: toDo,
      });

      return createdTodo;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2003"
      ) {
        throw new Error("Status not found, please try again");
      }
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
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
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new Error("ToDo not found, can not update");
      } else if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2003"
      ) {
        throw new Error("Status not found, please try again");
      }
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static updateAll = async (
    toDos: UpdateToDoDTO[]
  ): Promise<ToDo[] | Prisma.PrismaClientKnownRequestError> => {
    try {
      const updatedPromises = toDos.map((toDo) =>
        prisma.toDo.update({
          where: {
            id: toDo.id,
          },
          data: toDo,
        })
      );
      const updatedToDos = await Promise.all(updatedPromises);
      return updatedToDos;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new Error("ToDo not found, can not update");
      } else if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2003"
      ) {
        throw new Error("Status not found, please try again");
      }
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };

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
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new Error("ToDo not found, can not delete");
      }
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
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
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };
}
