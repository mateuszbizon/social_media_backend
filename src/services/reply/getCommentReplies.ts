import { PrismaClient } from "../../../generated/prisma";
import { GetCommentRepliesSearchParams } from "../../types/searchParams";

type Props = GetCommentRepliesSearchParams & {
    commentId: string
    userId: string | null
}

const prisma = new PrismaClient()
const limit = 20

export async function getCommentReplies({ commentId, page, userId }: Props) {
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
                ...(userId && {
                    likes: {
                        where: {
                            userId
                        },
                        select: {
                            id: true
                        }
                    }
                }),
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                },
                replyingTo: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                _count: {
                    select: {
                        likes: true
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
        replies: replies.map(reply => ({
            ...reply,
            isLiked: userId ? reply.likes.length > 0 : false
        })),
        currentPage: page,
        totalPages,
        totalReplies,
        nextPage: page < totalPages ? page + 1 : null,
    }
}