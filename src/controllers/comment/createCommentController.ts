import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { commentSchema, CommentSchema } from "../../dtos/commentSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { CreateCommentParams } from "../../types/params";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { createComment } from "../../services/comment/createComment";
import { USER_ID } from "../../constants";
import { CreateCommentResponse } from "../../types/commentResponse";

export async function createCommentController(req: Request<CreateCommentParams, {}, CommentSchema>, res: Response<CreateCommentResponse>, next: NextFunction) {
    const { content } = req.body
    const { postId } = req.params

    try {
        const validationResult = commentSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingPost = await getPostById(postId)

        if (!existingPost) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        const createdComment = await createComment({
            content,
            postId,
            authorId: res.locals[USER_ID]
        })

        res.status(201).json({
            comment: {
                id: createdComment.id,
                content: createdComment.content,
                createdAt: createdComment.createdAt,
                author: {
                    id: createdComment.author.id,
                    username: createdComment.author.username,
                    avatar: createdComment.author.avatar
                },
                likes: createdComment.likes,
                replyCount: createdComment._count.replies
            }
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}