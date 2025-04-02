import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { postSchema, PostSchema } from "../../dtos/postSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { createPost } from "../../services/post/createPost";
import { USER_ID } from "../../constants";
import { CreatedPost } from "../../types/postResponse";

export async function createPostController(req: Request<{}, {}, PostSchema>, res: Response<CreatedPost>, next: NextFunction) {
    const { content } = req.body
    const file = req.file

    try {
        const validationResult = postSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const createdPost = await createPost({
            content,
            authorId: res.locals[USER_ID]
        })

        res.status(201).json({
            post: createdPost
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError())
    }
}