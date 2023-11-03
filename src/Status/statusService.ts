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
      throw err as Prisma.PrismaClientKnownRequestError;
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
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static update = async (
    status: UpdateStatusDTO
  ): Promise<Status | Prisma.PrismaClientKnownRequestError> => {
    try {
      // Find the status to be updated
      const existingStatus = await prisma.status.findUnique({
        where: {
          id: status.id,
        },
      });

      if (!existingStatus) {
        throw new Error("Status not found");
      }

      // Get the starting position
      const startingPosition = existingStatus.position;

      const updatedStatus = await prisma.status.update({
        where: {
          id: status.id,
        },
        data: status,
      });

      // Get the new position

      const newPosition = updatedStatus.position;

      // check if the position has changed
      if (newPosition !== startingPosition) {
        // if it has, update the position of all impacted statuses
        if (newPosition > startingPosition) {
          await prisma.status.updateMany({
            where: {
              AND: [
                {
                  position: {
                    gt: startingPosition,
                  },
                },
                {
                  position: {
                    lte: newPosition,
                  },
                },
                {
                  NOT: {
                    id: status.id, // Exclude the updatedStatus
                  },
                },
              ],
            },
            data: {
              position: {
                decrement: 1,
              },
            },
          });
        } else if (newPosition < startingPosition) {
          await prisma.status.updateMany({
            where: {
              AND: [
                {
                  position: {
                    lt: startingPosition,
                  },
                },
                {
                  position: {
                    gte: newPosition,
                  },
                },
                {
                  NOT: {
                    id: status.id, // Exclude the updatedStatus
                  },
                },
              ],
            },
            data: {
              position: {
                increment: 1,
              },
            },
          });
        }
      }

      return updatedStatus;
    } catch (err) {
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
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
        // if status is in use, throw error
        if (err.code === "P2003") {
          throw new Error("Unable to delete status, it is in use");
        }
      }
      console.error(err);

      throw err as Prisma.PrismaClientKnownRequestError;
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
