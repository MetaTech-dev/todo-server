import { UpdateStatusDTO } from "./statusTypes";
import prisma from "../../prisma";
import { Prisma, Status } from "@prisma/client";
import { defaultStatuses } from "../../prisma/seed";

export default class StatusService {
  static list = async ({
    orgId,
    userId,
  }: {
    orgId?: string;
    userId: string;
  }) => {
    try {
      const statusList = await prisma.status.findMany({
        where: {
          orgId: orgId ? orgId : userId,
        },
        orderBy: {
          position: "asc",
        },
      });
      if (!statusList.length) {
        // if no statuses exist, create default statuses
        const createPromises = defaultStatuses.map((status) =>
          prisma.status.create({
            data: {
              ...status,
              orgId: orgId ? orgId : userId,
            },
          })
        );
        await Promise.all(createPromises);

        const newStatusList = await prisma.status.findMany({
          where: {
            orgId: orgId ? orgId : userId,
          },
          orderBy: {
            position: "asc",
          },
        });
        return newStatusList;
      }
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
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new Error(
            "Status name is already in use, please choose another"
          );
        }
      }
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
      const updatedStatus = await prisma.status.update({
        where: {
          id: status.id,
        },
        data: status,
      });

      return updatedStatus;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new Error(
            "Status name is already in use, please choose another"
          );
        }
      }
      console.error(err);
      throw err as Prisma.PrismaClientKnownRequestError;
    }
  };

  static updateAll = async (
    statuses: UpdateStatusDTO[]
  ): Promise<Status[] | Prisma.PrismaClientKnownRequestError> => {
    try {
      const updatePromises = statuses.map((status) =>
        prisma.status.update({
          where: {
            id: status.id,
          },
          data: {
            position: status.position,
          },
        })
      );
      const updatedStatuses = await Promise.all(updatePromises);
      return updatedStatuses;
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
