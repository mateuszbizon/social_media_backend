import { Chat as ChatModel, Message, User } from "../../generated/prisma"

export type Chat = Pick<ChatModel, "id"> & {
    participants: Pick<User, "id" | "avatar" | "username">[]
    lastMessage: Pick<Message, "id" | "content"> & {
        sender: Pick<User, "id">
    } | null
}

export type CreateChatResponse = {
    chat: Chat
}

export type GetChatsResponse = {
    chats: Chat[]
    currentPage: number
    nextPage: number | null
}