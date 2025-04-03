import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { UpdatePostParams } from "../../types/params";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { USER_ID } from "../../constants";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { deletePost } from "../../services/post/deletePost";
import { CreatedPost } from "../../types/postResponse";

export async function deletePostController(req: Request<UpdatePostParams>, res: Response<CreatedPost>, next: NextFunction) {
    const { postId } = req.params

    try {
        const existingPost = await getPostById(postId)

        if (!existingPost) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        if (existingPost.authorId !== res.locals[USER_ID]) {
            return next(new ForbiddenError())
        }

        const deletedPost = await deletePost(postId)

        res.status(200).json({
            post: deletedPost
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}