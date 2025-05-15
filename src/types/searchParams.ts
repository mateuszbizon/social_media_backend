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

export type SearchUsersSearchParams = {
    page: number
    query: string
}

export type GetChatsSearchParams = {
    page: number
}

export type GetChatMessagesSearchParams = {
    cursorId?: string
}