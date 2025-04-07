import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { DeleteReplyParams } from "../../types/params";
import { getReplyById } from "../../services/reply/getReplyById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { likeReply } from "../../services/reply/likeReply";
import { USER_ID } from "../../constants";
import { LikeReplyResponse } from "../../types/replyResponse";

export async function likeReplyController(req: Request<DeleteReplyParams>, res: Response<LikeReplyResponse>, next: NextFunction) {
    const { replyId } = req.params

    try {
        const existingReply = await getReplyById(replyId)

        if (!existingReply) {
            return next(new NotFoundError(MESSAGES.reply.notFound))
        }

        const likedReply = await likeReply(replyId, res.locals[USER_ID])

        res.status(200).json({
            likedReply
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}