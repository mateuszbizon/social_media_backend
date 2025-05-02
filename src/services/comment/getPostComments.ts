import { PrismaClient } from "../../../generated/prisma";
import { GetPostCommentsSearchParams } from "../../types/searchParams";

type Props = GetPostCommentsSearchParams & {
    postId: string
}

const prisma = new PrismaClient()
const limit = 20

export async function getPostComments({ postId, page, sort }: Props) {
    const skip = (page - 1) * limit

    const [comments, totalComments] = await prisma.$transaction([
        prisma.comment.findMany({
            where: {
                postId
            },
            skip,
            take: limit,
            orderBy: sort === 'popular' ? {
                likes: {
                    _count: "desc"
                }
            } : {
                createdAt: "desc"
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
                _count: {
                    select: {
                        replies: true
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
        prisma.comment.count({
            where: {
                postId
            }
        })
    ])

    const totalPages = Math.ceil(totalComments / limit)

    return {
        comments,
        currentPage: page,
        totalPages,
        totalComments,
        nextPage: page < totalPages ? page + 1 : null
    }
}