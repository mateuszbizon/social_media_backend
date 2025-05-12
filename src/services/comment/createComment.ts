import { Comment, PrismaClient } from "../../../generated/prisma";

type Props = Pick<Comment, "content" | "postId" | "authorId">

const prisma = new PrismaClient()

export async function createComment({ content, postId, authorId }: Props) {
    return prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    username: true,
                    avatar: true
                }
            },
            _count: {
                select: {
                    replies: true,
                    likes: true
                }
            }
        }
    })
}