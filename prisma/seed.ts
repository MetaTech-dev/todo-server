import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const freshStart = await prisma.status.createMany({
    data: [
      {
        title: "Ready",
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
    ],
    skipDuplicates: true,
  });

  const readyStatus = await prisma.status.findUnique({
    where: { title: "Ready" },
  });

  if (readyStatus) {
    await prisma.toDo.create({
      data: {
        title: "Welcome to toDo!",
        description: "Create your first toDo to get started",
        priority: "low",
        statusId: readyStatus.id,
      },
    });
  }

  console.log(freshStart);
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
