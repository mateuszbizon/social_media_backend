import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getChatById(chatId: string) {
    return await prisma.chat.findUnique({
        where: {
            id: chatId
        }
    })
}