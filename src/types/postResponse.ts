import { Post, PostLike, User } from "../../generated/prisma";

export type CreatedPost = {
    post: Post
}

export type LikePostResponse = {
    likedPost: boolean
}

export type GetPostResponse = {
    post: Pick<Post, "id" | "content" | "image" | "createdAt">
    author: Pick<User, "username" | "avatar">
    commentsCount: number
    likes: Pick<PostLike, "userId">[]
}