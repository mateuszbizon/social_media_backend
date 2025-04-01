import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getUserByUsername(username: string) {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}