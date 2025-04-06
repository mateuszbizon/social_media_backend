import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export function getUserById(userId: string) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}