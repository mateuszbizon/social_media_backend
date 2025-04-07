import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function getReplyById(replyId: string) {
    return prisma.reply.findUnique({
        where: {
            id: replyId
        }
    })
}