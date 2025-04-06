import { PrismaClient, User } from "../../../generated/prisma";

type Props = Pick<User, "firstName" | "lastName" | "username" | "id" | "avatar" | "avatarId">

const prisma = new PrismaClient()

export function updateUserProfile({ firstName, lastName, username, id, avatar, avatarId }: Props) {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            firstName,
            lastName,
            username,
            avatar,
            avatarId
        }
    })
}