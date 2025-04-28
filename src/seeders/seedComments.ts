import { Comment, PrismaClient } from "../../generated/prisma";
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function seedComments() {
    const data: Pick<Comment, "content" | "authorId" | "postId">[] = []
    const users = await prisma.user.findMany({
        select: {
            id: true
        }
    })

    if (users.length == 0) {
        throw new Error("There are no users!")
    }

    const posts = await prisma.post.findMany({
        select: {
            id: true
        }
    })

    if (posts.length == 0) {
        throw new Error("There are no posts!")
    }

    for (let i = 0; i < 40; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomPost = posts[Math.floor(Math.random() * posts.length)]

        data.push({
			content: faker.lorem.sentences({ min: 2, max: 5 }),
			authorId: randomUser.id,
			postId: randomPost.id,
		}) 
    }

    await prisma.comment.createMany({
        data
    })

    console.log("Comments created")
}

seedComments().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})