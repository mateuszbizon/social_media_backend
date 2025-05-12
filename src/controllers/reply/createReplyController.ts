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
    const { commentId, replyingToId } = req.params

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
            authorId: res.locals[USER_ID],
            replyingToId
        })

        res.status(201).json({
            reply: {
                id: createdReply.id,
                content: createdReply.content,
                createdAt: createdReply.createdAt,
                author: {
                    id: createdReply.author.id,
                    username: createdReply.author.username,
                    avatar: createdReply.author.avatar,
                },
                likeCount: createdReply._count.likes,
                isLiked: false,
                replyingTo: {
                    id: createdReply.replyingTo.id,
                    username: createdReply.replyingTo.username,
                }
            }
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}