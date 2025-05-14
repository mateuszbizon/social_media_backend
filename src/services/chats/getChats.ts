import { PrismaClient } from "../../../generated/prisma";
import { GetChatsSearchParams } from "../../types/searchParams";

type Props = GetChatsSearchParams & {
    userId: string
}

const prisma = new PrismaClient()
const limit = 20

export async function getChats({ page, userId }: Props) {
    const skip = (page - 1) * limit
    const [chats, totalChats] = await prisma.$transaction([
        prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: userId
                    }
                }
            },
            take: limit,
            skip,
            orderBy: {
                updatedAt: "desc"
            },
            select: {
                id: true,
                lastMessage: {
                    select: {
                        id: true,
                        content: true,
                        sender: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
                participants: {
                    select: {
                        id: true,
                        avatar: true,
                        username: true
                    }
                }
            }
        }),
        prisma.chat.count({
            where: {
                participants: {
                    some: {
                        id: userId
                    }
                }
            }
        })
    ])

    const totalPages = Math.ceil(totalChats / limit)

    return {
        chats,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null
    }
}