import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { FollowUserParams } from "../../types/params";
import { getUserById } from "../../services/users/getUserById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetUserPostsSearchParams } from "../../types/searchParams";
import { getUserPosts } from "../../services/post/getUserPosts";
import { GetUserPostsResponse } from "../../types/postResponse";

export async function getUserPostsController(req: Request<FollowUserParams, {}, {}, GetUserPostsSearchParams>, res: Response<GetUserPostsResponse>, next: NextFunction) {
    const { userId } = req.params
    const page = Number(req.query.page) || 1
    const sort = req.query.sort === "asc" ? "asc" : "desc"

    try {
        const existingUser = await getUserById(userId)

        if (!existingUser) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        const posts = await getUserPosts({
            userId,
            page,
            sort
        })

        res.status(200).json({
            posts: posts.posts.map(post => {
                return {
                    ...post, 
                    likeCount: post._count.likes,
                    commentCount: post._count.comments
                }
            }),
            currentPage: posts.currentPage,
            totalPages: posts.totalPages,
            totalPosts: posts.totalPosts
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}