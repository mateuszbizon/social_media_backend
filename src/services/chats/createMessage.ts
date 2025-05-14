import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

type Props = {
    chatId: string
    content: string
    senderId: string
}

export async function createMessage({ chatId, content, senderId }: Props) {
    const createdMessage = await prisma.message.create({
        data: {
            content,
            chatId,
            senderId
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            sender: {
                select: {
                    id: true,
                    avatar: true,
                    username: true
                }
            }
        }
    })

    await prisma.chat.update({
        where: {
            id: chatId
        },
        data: {
            lastMessageId: createdMessage.id
        }
    })

    return createdMessage
}