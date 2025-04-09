import { Post, PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

async function seedPosts() {
    const data: Pick<Post, "content" | "authorId">[] = []
    const users = await prisma.user.findMany({
        select: {
            id: true
        }
    })

    if (users.length == 0) {
        throw new Error("There are no users!")
    }

    for (let i = 0; i < 20; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        
        data.push({ content: "", authorId: randomUser.id })  
    }

    console.log(data)
}

seedPosts().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})