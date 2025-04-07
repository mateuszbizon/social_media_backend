import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function deleteReply(replyId: string) {
    return prisma.reply.delete({
        where: {
            id: replyId
        }
    })
}