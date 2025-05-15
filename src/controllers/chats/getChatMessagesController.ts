import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { CreateMessageParams } from "../../types/params";
import { getChatById } from "../../services/chats/getChatById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetChatMessagesSearchParams } from "../../types/searchParams";
import { getChatMessages } from "../../services/chats/getChatMessages";
import { GetChatMessagesResponse } from "../../types/chatResponse";

export async function getChatMessagesController(req: Request<CreateMessageParams, {}, {}, GetChatMessagesSearchParams>, res: Response<GetChatMessagesResponse>, next: NextFunction) {
    const { chatId } = req.params
    const { cursorId } = req.query

    try {
        const existingChat = await getChatById(chatId)

        if (!existingChat) {
            return next(new NotFoundError(MESSAGES.chat.notFound))
        }

        const messages = await getChatMessages({
            chatId,
            cursorId
        })

        res.status(200).json({
            messages
        })
    } catch (error) {
        next(new DatabaseError(writeError(error)))
    }
}