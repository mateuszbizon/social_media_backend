import { User } from "../../generated/prisma";

export type SignUpResponse = {
    user: Pick<User, "firstName" | "lastName" | "username">
}

export type SignInResponse = {
    token: string
    user: Pick<User, "id" | "firstName" | "lastName" | "username">
}