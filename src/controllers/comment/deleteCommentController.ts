import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { DeleteCommentParams } from "../../types/params";
import { getCommentById } from "../../services/comment/getCommentById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { deleteComment } from "../../services/comment/deleteComment";
import { DeleteCommentResponse } from "../../types/commentResponse";

export async function deleteCommentController(req: Request<DeleteCommentParams>, res: Response<DeleteCommentResponse>, next: NextFunction) {
    const { commentId } = req.params

    try {
        const existingComment = await getCommentById(commentId)

        if (!existingComment) {
            return next(new NotFoundError(MESSAGES.comment.notFound))
        }

        const deletedComment = await deleteComment(commentId)

        res.status(200).json({
            comment: deletedComment
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}