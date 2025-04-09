import { PrismaClient } from "../../../generated/prisma";
import { GetUserPostsSearchParams } from "../../types/searchParams";

type Props = GetUserPostsSearchParams & {
    userId: string
}

const prisma = new PrismaClient()
const limit = 12

export async function getUserPosts({ userId, page, sort }: Props) {
    const skip = (page - 1) * limit
    const [posts, totalPosts] = await prisma.$transaction([
        prisma.post.findMany({
            where: {
                authorId: userId
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: sort
            },
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
        }),
        prisma.post.count({
            where: {
                authorId: userId
            }
        })
    ])

    return {
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
    }
}