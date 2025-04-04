import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function deleteComment(commentId: string) {
    return prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}