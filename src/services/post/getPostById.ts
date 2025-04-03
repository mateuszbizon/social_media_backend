import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

export async function getPostById(postId: string) {
    return prisma.post.findUnique({
        where: {
            id: postId
        }
    })
}