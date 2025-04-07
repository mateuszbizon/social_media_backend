import { Reply } from "../../generated/prisma"

export type CreateReplyResponse = {
    reply: Reply
}

export type LikeReplyResponse = {
    likedReply: boolean
}