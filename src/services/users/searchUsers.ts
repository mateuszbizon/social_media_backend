import { PrismaClient } from "../../../generated/prisma";
import { SearchUsersSearchParams } from "../../types/searchParams";

const prisma = new PrismaClient()
const limit = 20

export async function searchUsers({ page, query }: SearchUsersSearchParams) {
    const skip = (page - 1) * limit

    const [users, totalUsers] = await prisma.$transaction([
        prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: "insensitive" } },
                    { firstName: { contains: query, mode: "insensitive" } },
                    { lastName: { contains: query, mode: "insensitive" } },
                ]
            },
            skip,
            take: limit,
            orderBy: {
                followers: {
                    _count: "desc"
                }
            },
            select: {
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        }),
        prisma.user.count({
            where: {
                OR: [
                    { username: { contains: query, mode: "insensitive" } },
                    { firstName: { contains: query, mode: "insensitive" } },
                    { lastName: { contains: query, mode: "insensitive" } },
                ]
            },
        })
    ])

    const totalPages = Math.ceil(totalUsers / limit)

    return {
        users,
        currentPage: page,
        totalPages,
        totalUsers,
        nextPage: page < totalPages ? page + 1 : null
    }
}