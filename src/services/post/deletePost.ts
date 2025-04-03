import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function deletePost(postId: string) {
    return prisma.post.delete({
        where: {
            id: postId
        }
    })
}