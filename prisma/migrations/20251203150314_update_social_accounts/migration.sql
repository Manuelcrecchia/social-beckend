-- AlterTable
ALTER TABLE `Account` ADD COLUMN `refreshToken` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'connected',
    ADD COLUMN `username` VARCHAR(191) NULL;
