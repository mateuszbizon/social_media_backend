import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetPostParams } from "../../types/params";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { getPostComments } from "../../services/comment/getPostComments";
import { GetPostCommentsSearchParams } from "../../types/searchParams";
import { GetPostCommentsResponse } from "../../types/commentResponse";

export async function getPostCommentsController(req: Request<GetPostParams, {}, {}, GetPostCommentsSearchParams>, res: Response<GetPostCommentsResponse>, next: NextFunction) {
    const { postId } = req.params
    const page = Number(req.query.page) || 1
    const sort = req.query.sort === "desc" ? "desc" : "popular"

    try {
        const existingPost = await getPostById(postId)

        if (!existingPost) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        const comments = await getPostComments({
            postId,
            page,
            sort
        })

        res.status(200).json({
            comments: comments.comments.map(comment => {
                return {
                    ...comment,
                    replyCount: comment._count.replies
                }
            }),
            currentPage: comments.currentPage,
            totalPages: comments.totalPages,
            totalComments: comments.totalComments
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}