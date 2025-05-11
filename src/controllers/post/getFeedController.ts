import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { USER_ID } from "../../constants";
import { getFeed } from "../../services/post/getFeed";
import { GetFeedResponse } from "../../types/postResponse";

export async function getFeedController(req: Request, res: Response<GetFeedResponse>, next: NextFunction) {
    const page = Number(req.query.page) || 1
    const userId = res.locals[USER_ID] as string | null

    try {
        const feed = await getFeed({
            page,
            userId
        })

        res.status(200).json({
            posts: feed.posts.map(post => {
                return {
                    ...post,
                    commentCount: post._count.comments
                }
            }),
            nextPage: feed.nextPage,
            currentPage: feed.currentPage
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}