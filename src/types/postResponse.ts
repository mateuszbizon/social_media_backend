import { Post, PostLike, User } from "../../generated/prisma";

export type CreatedPost = {
    post: Post
}

export type LikePostResponse = {
    likedPost: boolean
}

export type GetPostResponse = {
    post: Pick<Post, "id" | "content" | "image" | "createdAt">
    author: Pick<User, "username" | "avatar" | "id">
    commentsCount: number
    likes: Pick<PostLike, "userId">[]
}

export type GetUserPostsResponse = {
    posts: {
        id: Post["id"]
        content: Post["content"]
        image: Post["image"]
        createdAt: Post["createdAt"]
        likeCount: number
        commentCount: number
    }[]
    currentPage: number
    totalPages: number
    totalPosts: number
    nextPage: number | null
}

export type GetBasicPostResponse = Pick<Post, "id" | "content" | "image" | "authorId">

export type GetFeedResponse = {
    posts: {
        id: Post["id"]
        content: Post["content"]
        image: Post["image"]
        createdAt: Post["createdAt"]
        author: Pick<User, "username" | "avatar" | "id">
        likes: Pick<PostLike, "userId">[]
        commentCount: number
    }[]
    nextPage: number | null
}