import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function likePost(userId: string, postId: string) {
    try {
        await prisma.postLike.create({
            data: {
                userId,
                postId
            }
        })

        return true
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            await prisma.postLike.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId   
                    }
                }
            })

            return false
        }

        throw error
    }
}