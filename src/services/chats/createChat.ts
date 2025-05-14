import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function createChat(userIds: string[]) {
    return await prisma.chat.create({
        data: {
            participants: {
                connect: userIds.map(id => ({ id }))
            }
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
    })
}