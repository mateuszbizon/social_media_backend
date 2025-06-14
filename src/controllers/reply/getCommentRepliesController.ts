import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetCommentRepliesParams } from "../../types/params";
import { getCommentById } from "../../services/comment/getCommentById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetCommentRepliesSearchParams } from "../../types/searchParams";
import { getCommentReplies } from "../../services/reply/getCommentReplies";
import { GetCommentRepliesResponse } from "../../types/replyResponse";
import { USER_ID } from "../../constants";

export async function getCommentRepliesController(req: Request<GetCommentRepliesParams, {}, {}>, res: Response<GetCommentRepliesResponse>, next: NextFunction) {
    const { commentId } = req.params
    const page = Number(req.query.page) || 1
    const userId = res.locals[USER_ID] as string | null

    try {
        const existingComment = await getCommentById(commentId)

        if (!existingComment) {
            return next(new NotFoundError(MESSAGES.comment.notFound))
        }

        const replies = await getCommentReplies({
            commentId,
            page,
            userId
        })

        res.status(200).json({
            replies: replies.replies.map(reply => {
                return {
                    ...reply,
                    likeCount: reply._count.likes
                }
            }),
            currentPage: replies.currentPage,
            totalPages: replies.totalPages,
            totalReplies: replies.totalReplies,
            nextPage: replies.nextPage
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}