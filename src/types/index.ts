import { User } from "../../generated/prisma";

export type TokenPayload = Pick<User, "id" | "username" | "firstName" | "lastName">

export type UploadFile = {
    secureUrl: string
    imageId: string
} | null