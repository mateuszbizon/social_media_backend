import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function followUser(followerId: string, followingId: string) {
    try {
        await prisma.follow.create({
            data: {
                followerId,
                followingId
            }
        })

        return true
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId
                    }
                }
            })

            return false
        }

        throw error
    }
}