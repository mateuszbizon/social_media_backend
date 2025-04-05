import { Comment } from "../../generated/prisma"

export type CreateCommentResponse = {
    comment: Comment
}

export type LikeCommentResponse = {
    likedComment: boolean
}