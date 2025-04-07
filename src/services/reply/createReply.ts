import { PrismaClient, Reply } from "../../../generated/prisma";

type Props = Pick<Reply, "content" | "commentId" | "authorId">

const prisma = new PrismaClient()

export function createReply({ commentId, content, authorId }: Props) {
    return prisma.reply.create({
        data: {
            content,
            commentId,
            authorId
        }
    })
}