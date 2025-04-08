export type UpdatePostParams = {
    postId: string
}

export type CreateCommentParams = {
    postId: string
}

export type DeleteCommentParams = {
    commentId: string
}

export type LikePostParams = {
    postId: string
}

export type LikeCommentParams = {
    commentId: string
}

export type GetPostParams = {
    postId: string
}

export type GetUserProfileParams = {
    username: string
}

export type CreateReplyParams = {
    commentId: string
}

export type DeleteReplyParams = {
    replyId: string
}

export type FollowUserParams = {
    userId: string
}

export type GetCommentRepliesParams = {
    commentId: string
}