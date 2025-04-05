import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function likeComment(userId: string, commentId: string) {
    try {
        await prisma.commentLike.create({
            data: {
                userId,
                commentId
            }
        })

        return true
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            await prisma.commentLike.delete({
                where: {
                    userId_commentId: {
                        userId,
                        commentId   
                    }
                }
            })

            return false
        }

        throw error
    }
}