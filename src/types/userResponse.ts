import { Follow, User } from "../../generated/prisma";

export type SignUpResponse = {
    user: Pick<User, "firstName" | "lastName" | "username">
}

export type SignInResponse = {
    token: string
    user: Pick<User, "id" | "firstName" | "lastName" | "username" | "avatar">
}

export type GetUserProfileResponse = {
    user: Pick<User, "firstName" | "lastName" | "username" | "avatar" | "id">
    postsCount: number
    followersCount: number
    followingCount: number
    followers: Pick<Follow, "followerId">[]
}

export type UpdateUserProfileResponse = {
    user: Pick<User, "firstName" | "lastName" | "username" | "avatar" | "id">
    token: string
}

export type SearchUsersResponse = {
    users: {
        id: User["id"]
        username: User["username"]
        firstName: User["firstName"]
        lastName: User["lastName"]
        avatar: User["avatar"]
        followersCount: number
    }[]
    totalPages: number
    currentPage: number
    totalUsers: number
    nextPage: number | null
}