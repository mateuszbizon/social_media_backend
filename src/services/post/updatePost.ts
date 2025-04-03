import { Post, PrismaClient } from "../../../generated/prisma";

type Props = Pick<Post, "content" | "image" | "imageId" | "id">

const prisma = new PrismaClient()

export async function updatePost({ content, image, imageId, id }: Props) {
    return prisma.post.update({
        where: {
            id
        },
        data: {
            content,
            image,
            imageId
        }
    })
}