import { Comment, User } from "../../generated/prisma"

export type PostComment = Pick<Comment, "id" | "content" | "createdAt"> & {
    author: Pick<User, "username" | "avatar" | "id">
    replyCount: number
    likeCount: number
    isLiked: boolean
}

export type CreateCommentResponse = {
    comment: PostComment
}

export type DeleteCommentResponse = {
    comment: Comment
}


export type LikeCommentResponse = {
    likedComment: boolean
}

export type GetPostCommentsResponse = {
    comments: PostComment[]
    totalPages: number
    currentPage: number
    totalComments: number
    nextPage: number | null
}