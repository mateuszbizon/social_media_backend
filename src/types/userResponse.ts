import { User } from "../../generated/prisma";

export type SignUpResponse = {
    user: Pick<User, "firstName" | "lastName" | "username">
}