import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetPostParams } from "../../types/params";
import { getPostById } from "../../services/post/getPostById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetBasicPostResponse } from "../../types/postResponse";

export async function getBasicPostController(req: Request<GetPostParams>, res: Response<GetBasicPostResponse>, next: NextFunction) {
    const { postId } = req.params

    try {
        const post = await getPostById(postId)

        if (!post) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }

        res.status(200).json({
            id: post.id,
            content: post.content,
            image: post.image,
            authorId: post.authorId
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}