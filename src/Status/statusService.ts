import { UpdateStatusDTO } from "./statusTypes";
import prisma from "../../prisma";
import { Prisma, Status } from "@prisma/client";

export default class StatusService {
  static list = async () => {
    try {
      const statusList = await prisma.status.findMany({
        orderBy: {
          position: "asc",
        },
      });
      return statusList;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static create = async (
    status: Prisma.StatusCreateInput
  ): Promise<Status | Prisma.PrismaClientKnownRequestError> => {
    try {
      const existingStatus = await prisma.status.findMany({});

      const newPosition = existingStatus.length + 1;

      const createdStatus = await prisma.status.create({
        data: {
          ...status,
          position: newPosition,
        },
      });

      return createdStatus;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  // TODO: handle errors for these

  static update = async (
    status: UpdateStatusDTO
  ): Promise<Status | Prisma.PrismaClientKnownRequestError> => {
    try {
      const updatedStatus = await prisma.status.update({
        where: {
          id: status.id,
        },
        data: status,
      });

      return updatedStatus;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static remove = async (
    id: number
  ): Promise<boolean | Error | Prisma.PrismaClientKnownRequestError> => {
    try {
      // find ID of status to delete
      const statusToDelete = await prisma.status.findUnique({
        where: {
          id,
        },
        select: {
          position: true,
        },
      });
      // if statusToDelete is null, throw error
      if (!statusToDelete) {
        throw new Error("Status not found, unable to Delete");
      }
      // delete the desired status
      await prisma.status.delete({
        where: {
          id,
        },
      });

      //update the position of all statuses after the deleted status
      await prisma.status.updateMany({
        where: {
          position: {
            gt: statusToDelete.position,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
      return true;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
          console.log("Unable to delete status, it is in use", err.code);

          // throw new Error("Unable to delete status, it is in use");  Circle back to this
        }
      }
      console.error(err);

      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static getOne = async (
    id: number
  ): Promise<Status | Prisma.PrismaClientKnownRequestError | null> => {
    try {
      const theOneStatus = await prisma.status.findUnique({
        where: {
          id,
        },
      });
      return theOneStatus;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };
}
