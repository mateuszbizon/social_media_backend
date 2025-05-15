import { PrismaClient } from "../../../generated/prisma";
import { GetChatMessagesSearchParams } from "../../types/searchParams";

type Props = GetChatMessagesSearchParams & {
    chatId: string
}

const prisma = new PrismaClient()

export async function getChatMessages({ cursorId, chatId }: Props) {
    return await prisma.message.findMany({
        where: {
            chatId
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 20,
        ...(cursorId && {
            cursor: { id: cursorId },
            skip: 1,
        }),
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
}