import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetPostParams } from "../../types/params";
import { getFullPost } from "../../services/post/getFullPost";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetPostResponse } from "../../types/postResponse";
import { USER_ID } from "../../constants";

export async function getPostController(req: Request<GetPostParams>, res: Response<GetPostResponse>, next: NextFunction) {
    const { postId } = req.params
    const userId = res.locals[USER_ID] as string | null

    try {
        const post = await getFullPost(postId, userId)

        if (!post) {
            return next(new NotFoundError(MESSAGES.post.notFound))
        }
        
        res.status(200).json({
            post: {
                id: post.id,
                content: post.content,
                image: post.image,
                createdAt: post.createdAt
            },
            author: {
                id: post.author.id,
                username: post.author.username,
                avatar: post.author.avatar
            },
            commentsCount: post._count.comments,
            likesCount: post._count.likes,
            isLiked: post.isLiked
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}