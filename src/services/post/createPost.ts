import { Post, PrismaClient } from "../../../generated/prisma";

type Props = Pick<Post, "content" | "authorId" | "image" | "imageId">

const prisma = new PrismaClient()

export async function createPost({ content, authorId, image, imageId }: Props) {
    return prisma.post.create({
        data: {
            content,
            authorId,
            image,
            imageId
        }
    })
}