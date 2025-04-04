import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function getCommentById(commentId: string) {
    return prisma.comment.findUnique({
        where: {
            id: commentId
        }
    })
}