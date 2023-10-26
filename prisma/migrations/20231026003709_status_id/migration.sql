/*
  Warnings:

  - You are about to drop the column `status` on the `ToDo` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ToDo` DROP COLUMN `status`,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ToDo` ADD CONSTRAINT `ToDo_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
