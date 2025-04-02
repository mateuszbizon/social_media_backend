import { Post, PrismaClient } from "../../../generated/prisma";

type Props = Pick<Post, "content" | "authorId" | "image">

const prisma = new PrismaClient()

export async function createPost({ content, authorId, image }: Props) {
    return prisma.post.create({
        data: {
            content,
            authorId,
            image
        }
    })
}