import { PrismaClient } from "../../../generated/prisma"

type Props = {
    page: number
    userId: string | null
}

const prisma = new PrismaClient()
const limit = 20

export async function getFeed({ page, userId }: Props) {
    const skip = (page - 1) * limit

    if (userId) {
        const followedUsers = await prisma.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        })

        const followingIds = followedUsers.map(f => f.followingId)

        const [posts, totalPosts] = await prisma.$transaction([
            prisma.post.findMany({
                where: {
                    authorId: {
                        in: followingIds
                    }
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    content: true,
                    image: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true
                        }
                    },
                    likes: {
                        select: {
                            userId: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            }),
            prisma.post.count({
                where: {
                    authorId: {
                        in: followingIds
                    }
                }
            })
        ])

        const totalPages = Math.ceil(totalPosts / limit)

        return {
            posts,
            nextPage: page < totalPages ? page + 1 : null
        }
    }

    const [posts, totalPosts] = await prisma.$transaction([
        prisma.post.findMany({
            skip,
            take: limit,
            orderBy: [
                {
                    likes: {
                        _count: 'desc'
                    }
                },
                {
                    comments: {
                        _count: 'desc'
                    }
                }
            ],
            select: {
                id: true,
                content: true,
                image: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        }),
        prisma.post.count()
    ])

    const totalPages = Math.ceil(totalPosts / limit)

    return {
        posts,
        nextPage: page < totalPages ? page + 1 : null
    }
}