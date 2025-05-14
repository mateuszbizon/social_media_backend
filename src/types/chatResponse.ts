import { Chat, Message, User } from "../../generated/prisma"

export type CreateChatResponse = {
    chat: Pick<Chat, "id"> & {
        participants: Pick<User, "id" | "avatar" | "username">[]
        lastMessage: Pick<Message, "id" | "content"> & {
            sender: Pick<User, "id">
        } | null
    }
}