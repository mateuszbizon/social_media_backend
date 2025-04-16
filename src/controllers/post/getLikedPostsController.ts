import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { getUserById } from "../../services/users/getUserById";
import { USER_ID } from "../../constants";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { getLikedPosts } from "../../services/post/getLikedPosts";
import { GetUserPostsResponse } from "../../types/postResponse";

export async function getLikedPostsController(req: Request, res: Response<GetUserPostsResponse>, next: NextFunction) {
    const page = Number(req.query.page) || 1
    const sort = req.query.sort === "asc" ? "asc" : "desc"

    try {
        const existingUser = await getUserById(res.locals[USER_ID])

        if (!existingUser) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        const posts = await getLikedPosts({
            userId: res.locals[USER_ID],
            page,
            sort
        })

        res.status(200).json({
            posts: posts.posts.map(post => {
                return {
                    ...post.post, 
                    likeCount: post.post._count.likes,
                    commentCount: post.post._count.comments
                }
            }),
            currentPage: posts.currentPage,
            totalPages: posts.totalPages,
            totalPosts: posts.totalPosts,
            nextPage: posts.nextPage
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}