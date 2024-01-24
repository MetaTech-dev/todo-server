/*
  Warnings:

  - A unique constraint covering the columns `[title,orgId]` on the table `Status` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Status_title_key` ON `Status`;

-- CreateIndex
CREATE UNIQUE INDEX `Status_title_orgId_key` ON `Status`(`title`, `orgId`);
