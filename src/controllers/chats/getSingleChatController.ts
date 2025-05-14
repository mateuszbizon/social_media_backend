import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { CreateMessageParams } from "../../types/params";
import { getChatById } from "../../services/chats/getChatById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";

export async function getSingleChatController(req: Request<CreateMessageParams>, res: Response, next: NextFunction) {
    const { chatId } = req.params

    try {
        const existingChat = await getChatById(chatId)

        if (!existingChat) {
            return next(new NotFoundError(MESSAGES.chat.notFound))
        }

        res.status(200).json({
            chat: existingChat
        })
    } catch (error) {
        next(new DatabaseError(writeError(error)))
    }
}