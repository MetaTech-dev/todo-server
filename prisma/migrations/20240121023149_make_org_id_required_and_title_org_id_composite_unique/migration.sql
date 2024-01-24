/*
  Warnings:

  - Made the column `orgId` on table `Status` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orgId` on table `ToDo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Status` MODIFY `orgId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ToDo` MODIFY `orgId` VARCHAR(191) NOT NULL;
