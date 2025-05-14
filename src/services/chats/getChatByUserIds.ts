import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getChatByUserIds(userIds: string[]) {
    return await prisma.chat.findFirst({
        where: {
            participants: {
                every: {
                    id: { in: userIds }
                }
            }
      }
    })
}