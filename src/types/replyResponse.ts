import { Reply, User } from "../../generated/prisma"

export type CommentReply = Pick<Reply, "id" | "content" | "createdAt"> & {
    likeCount: number
    author: Pick<User, "username" | "avatar" | "id">
    replyingTo: Pick<User, "id" | "username">
    isLiked: boolean
}

export type CreateReplyResponse = {
    reply: CommentReply
}

export type DeleteReplyResponse = {
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