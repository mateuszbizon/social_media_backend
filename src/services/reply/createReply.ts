import { PrismaClient, Reply } from "../../../generated/prisma";

type Props = Pick<Reply, "content" | "commentId" | "authorId" | "replyingToId">

const prisma = new PrismaClient()

export function createReply({ commentId, content, authorId, replyingToId }: Props) {
    return prisma.reply.create({
        data: {
            content,
            commentId,
            authorId,
            replyingToId
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
                    likes: true
                }
            },
            replyingTo: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}