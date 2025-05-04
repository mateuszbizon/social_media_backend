import { PrismaClient } from "../../../generated/prisma";
import { GetCommentRepliesSearchParams } from "../../types/searchParams";

type Props = GetCommentRepliesSearchParams & {
    commentId: string
}

const prisma = new PrismaClient()
const limit = 20

export async function getCommentReplies({ commentId, page }: Props) {
    const skip = (page - 1) * limit

    const [replies, totalReplies] = await prisma.$transaction([
        prisma.reply.findMany({
            where: {
                commentId
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "asc"
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                }
            }
        }),
        prisma.reply.count({
            where: {
                commentId
            }
        })
    ])

    const totalPages = Math.ceil(totalReplies / limit)

    return {
        replies,
        currentPage: page,
        totalPages,
        totalReplies,
        nextPage: page < totalPages ? page + 1 : null,
    }
}