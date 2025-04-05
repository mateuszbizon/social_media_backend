import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { LikePostParams } from "../../types/params";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { likePost } from "../../services/post/likePost";
import { USER_ID } from "../../constants";
import { LikePostResponse } from "../../types/postResponse";

export async function likePostController(req: Request<LikePostParams>, res: Response<LikePostResponse>, next: NextFunction) {
    const { postId } = req.params

    try {
        const existingPost = await getPostById(postId)

        if (!existingPost) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        const likedPost = await likePost(res.locals[USER_ID], postId)

        res.status(200).json({
            likedPost
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}