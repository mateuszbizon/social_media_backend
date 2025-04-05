import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { LikeCommentParams } from "../../types/params";
import { getCommentById } from "../../services/comment/getCommentById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { likeComment } from "../../services/comment/likeComment";
import { USER_ID } from "../../constants";
import { LikeCommentResponse } from "../../types/commentResponse";

export async function likeCommentController(req: Request<LikeCommentParams>, res: Response<LikeCommentResponse>, next: NextFunction) {
    const { commentId } = req.params

    try {
        const existingComment = await getCommentById(commentId)

        if (!existingComment) {
            return next(new NotFoundError(MESSAGES.comment.notFound))
        }

        const likedComment = await likeComment(res.locals[USER_ID], commentId)

        res.status(200).json({
            likedComment
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}