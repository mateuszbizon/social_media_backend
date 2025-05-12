import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getFullPost(postId: string, userId: string | null) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
            author: {
                select: {
                    username: true,
                    avatar: true,
                    id: true
                }
            },
            ...(userId && {
                likes: {
                    where: { userId },
                    select: { id: true },
                },
            }),
            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        }
    })

    if (!post) return null

    return {
        ...post,
        isLiked: userId ? post.likes.length > 0 : false
    }
}