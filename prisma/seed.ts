import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const defaultStatuses = [
  {
    title: "To Do",
    position: 1,
  },
  {
    title: "In Progress",
    position: 2,
  },
  {
    title: "Done",
    position: 3,
  },
];

const seed = async () => {};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
