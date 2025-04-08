export type GetUserPostsSearchParams = {
    page: number
    sort: "asc" | "desc"
}

export type GetPostCommentsSearchParams = {
    page: number
    sort: "popular" | "desc"
}

export type GetCommentRepliesSearchParams = {
    page: number
}