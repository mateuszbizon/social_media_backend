import { PrismaClient, User } from "../../../generated/prisma";

type Props = Pick<User, "password" | "id">

const prisma = new PrismaClient()

export function updateUserPassword({ password, id }: Props) {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            password
        }
    })
}