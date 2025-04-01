import { User } from "../../generated/prisma";

export type CheckUserAuth = {
    user: Pick<User, "id" | "firstName" | "lastName" | "username">
}