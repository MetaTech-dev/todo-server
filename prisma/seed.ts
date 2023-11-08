import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const ready = await prisma.status.upsert({
    where: { title: "Ready" },
    update: {},
    create: {
      title: "Ready",
      position: 1,
      toDos: {
        create: [
          {
            title: "Welcome to toDo!",
            description: "Create your first toDo to get started",
            priority: "low",
          },
        ],
      },
    },
  });

  const inProgress = await prisma.status.upsert({
    where: { title: "In Progress" },
    update: {},
    create: {
      title: "In Progress",
      position: 2,
    },
  });

  const done = await prisma.status.upsert({
    where: { title: "Done" },
    update: {},
    create: {
      title: "Done",
      position: 3,
    },
  });
  console.log(ready, inProgress, done);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
