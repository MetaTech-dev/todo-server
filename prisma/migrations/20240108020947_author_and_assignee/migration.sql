/*
  Warnings:

  - Added the required column `authorUserId` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ToDo` ADD COLUMN `assigneeUserId` VARCHAR(191) NULL,
    ADD COLUMN `authorUserId` VARCHAR(191) NOT NULL;
