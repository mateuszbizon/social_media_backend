/*
  Warnings:

  - Added the required column `replyingToId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "replyingToId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyingToId_fkey" FOREIGN KEY ("replyingToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
