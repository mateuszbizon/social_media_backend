import { PrismaClient, User } from "../../../generated/prisma";

type Props = Pick<User, "firstName" | "lastName" | "password" | "username">

const prisma = new PrismaClient()

export async function createUser({ firstName, lastName, password, username }: Props) {
    return prisma.user.create({
        data: {
            firstName,
            lastName,
            username,
            password
        },
        select: {
            firstName: true,
            lastName: true,
            username: true
        }
    })
}