import { Post, PrismaClient } from "../../../generated/prisma";

type Props = Pick<Post, "content" | "authorId">

const prisma = new PrismaClient()

export async function createPost({ content, authorId }: Props) {
    return prisma.post.create({
        data: {
            content,
            authorId
        }
    })
}