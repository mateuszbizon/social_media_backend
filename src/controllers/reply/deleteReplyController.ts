import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { DeleteReplyParams } from "../../types/params";
import { getReplyById } from "../../services/reply/getReplyById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { deleteReply } from "../../services/reply/deleteReply";
import { CreateReplyResponse } from "../../types/replyResponse";

export async function deleteReplyController(req: Request<DeleteReplyParams>, res: Response<CreateReplyResponse>, next: NextFunction) {
    const { replyId } = req.params

    try {
        const existingReply = await getReplyById(replyId)

        if (!existingReply) {
            return next(new NotFoundError(MESSAGES.reply.notFound))
        }

        const deletedReply = await deleteReply(replyId)

        res.status(200).json({
            reply: deletedReply
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}