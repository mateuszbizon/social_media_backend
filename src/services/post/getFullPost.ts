import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getFullPost(postId: string) {
    return prisma.post.findUnique({
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
                    avatar: true
                }
            },
            likes: {
                select: {
                    userId: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })
}