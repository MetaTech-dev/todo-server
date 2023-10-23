import { CreateStatusDTO, UpdateStatusDTO } from "./statusTypes";
import prisma from "../../prisma";
import { Prisma } from "@prisma/client";

interface Status {
  title: string;
  position: number;
  id: number;
}

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
    status: CreateStatusDTO
  ): Promise<Status | Prisma.PrismaClientKnownRequestError> => {
    try {
      const createdStatus = await prisma.status.create({
        data: status,
      });

      return createdStatus;
    } catch (err) {
      console.error(err);
      return err as Prisma.PrismaClientKnownRequestError;
    }
  };

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
  ): Promise<boolean | Prisma.PrismaClientKnownRequestError> => {
    try {
      await prisma.status.delete({
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
}
