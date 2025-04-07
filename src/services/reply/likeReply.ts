import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function likeReply(replyId: string, userId: string) {
    try {
        await prisma.replyLike.create({
            data: {
                replyId,
                userId
            }
        })

        return true
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            await prisma.replyLike.delete({
                where: {
                    userId_replyId: {
                        userId,
                        replyId   
                    }
                }
            })

            return false
        }

        throw error
    }
}