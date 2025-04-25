import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetPostParams } from "../../types/params";
import { getFullPost } from "../../services/post/getFullPost";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetPostResponse } from "../../types/postResponse";

export async function getPostController(req: Request<GetPostParams>, res: Response<GetPostResponse>, next: NextFunction) {
    const { postId } = req.params

    try {
        const post = await getFullPost(postId)

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
            likes: post.likes
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}