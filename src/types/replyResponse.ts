import { Reply, ReplyLike, User } from "../../generated/prisma"

export type CreateReplyResponse = {
    reply: Reply
}

export type LikeReplyResponse = {
    likedReply: boolean
}

export type GetCommentRepliesResponse = {
    replies: {
        id: Reply["id"]
        content: Reply["content"]
        createdAt: Reply["createdAt"]
        likes: {
            userId: ReplyLike["userId"]
        }[]
        author: {
            username: User["username"]
            avatar: User["avatar"]
        }
    }[]
    currentPage: number
    totalPages: number
    totalReplies: number
}