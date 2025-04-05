import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function getUserProfile(username: string) {
    return prisma.user.findUnique({
        where: {
            username
        },
        select: {
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            _count: {
                select: {
                    posts: true
                }
            }
        }
    })
}