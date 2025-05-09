import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function getUserProfile(username: string) {
    return prisma.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            followers: {
                select: {
                    followerId: true
                }
            },
            _count: {
                select: {
                    posts: true,
                    followers: true,
                    following: true
                }
            }
        }
    })
}