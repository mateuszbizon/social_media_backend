import { Reply, ReplyLike, User } from "../../generated/prisma"

export type CommentReply = Pick<Reply, "id" | "content" | "createdAt"> & {
    likes: Pick<ReplyLike, "userId">[]
    author: Pick<User, "username" | "avatar" | "id">
}

export type CreateReplyResponse = {
    reply: Reply
}

export type LikeReplyResponse = {
    likedReply: boolean
}

export type GetCommentRepliesResponse = {
    replies: CommentReply[]
    currentPage: number
    totalPages: number
    totalReplies: number
    nextPage: number | null
}