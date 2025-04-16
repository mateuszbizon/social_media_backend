import { PrismaClient } from "../../../generated/prisma";
import { GetUserPostsSearchParams } from "../../types/searchParams";

type Props = GetUserPostsSearchParams & {
    userId: string
}

const prisma = new PrismaClient()
const limit = 12

export async function getLikedPosts({ userId, page, sort }: Props) {
    const skip = (page - 1) * limit
    const [posts, totalPosts] = await prisma.$transaction([
        prisma.postLike.findMany({
            where: {
                userId
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: sort
            },
            select: {
                post: {
                    select: {
                        id: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        _count: {
                            select: {
                                likes: true,
                                comments: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.postLike.count({
            where: {
                userId
            }
        })
    ])

    const totalPages = Math.ceil(totalPosts / limit)

    return {
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
        nextPage: page < totalPages ? page + 1 : null
    }
}