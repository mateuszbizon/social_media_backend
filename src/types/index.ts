import { User } from "../../generated/prisma";

export type TokenPayload = Pick<User, "id" | "username" | "firstName" | "lastName" | "avatar">

export type UploadFile = {
    secureUrl: string
    imageId: string
} | null