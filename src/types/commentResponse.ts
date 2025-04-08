import { Comment, CommentLike, User } from "../../generated/prisma"

export type CreateCommentResponse = {
    comment: Comment
}

export type LikeCommentResponse = {
    likedComment: boolean
}

export type GetPostCommentsResponse = {
    comments: {
        id: Comment["id"]
        content: Comment["content"]
        likes: {
            userId: CommentLike["userId"]
        }[]
        author: {
            username: User["username"]
            avatar: User["avatar"]
        }
        replyCount: number
    }[]
    totalPages: number
    currentPage: number
    totalComments: number
}