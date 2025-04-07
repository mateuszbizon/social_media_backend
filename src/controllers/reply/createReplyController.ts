import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { CreateReplyParams } from "../../types/params";
import { commentSchema, CommentSchema } from "../../dtos/commentSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { getCommentById } from "../../services/comment/getCommentById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { createReply } from "../../services/reply/createReply";
import { USER_ID } from "../../constants";
import { CreateReplyResponse } from "../../types/replyResponse";

export async function createReplyController(req: Request<CreateReplyParams, {}, CommentSchema>, res: Response<CreateReplyResponse>, next: NextFunction) {
    const { content } = req.body
    const { commentId } = req.params

    try {
        const validationResult = commentSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingComment = await getCommentById(commentId)

        if (!existingComment) {
            return next(new NotFoundError(MESSAGES.comment.notFound))
        }

        const createdReply = await createReply({
            content,
            commentId,
            authorId: res.locals[USER_ID]
        })

        res.status(201).json({
            reply: createdReply
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}