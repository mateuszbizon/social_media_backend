import { PrismaClient, Reply } from "../../generated/prisma"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

export async function seedReplies() {
    const data: Pick<Reply, "content" | "authorId" | "commentId">[] = []
    const users = await prisma.user.findMany({
        select: {
            id: true
        }
    })

    if (users.length == 0) {
        throw new Error("There are no users!")
    }

    const comments = await prisma.comment.findMany({
        select: {
            id: true
        }
    })

    if (comments.length == 0) {
        throw new Error("There are no comments!")
    }

    for (let i = 0; i < 60; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomComment = comments[Math.floor(Math.random() * comments.length)]

        data.push({
            content: faker.lorem.sentences({ min: 2, max: 5 }),
            authorId: randomUser.id,
            commentId: randomComment.id,
        })
    }

    await prisma.reply.createMany({
        data
    })

    console.log("Replies created")
}

seedReplies().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})