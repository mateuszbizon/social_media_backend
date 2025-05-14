import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { chatSchema, ChatSchema } from "../../dtos/chatSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { createChat } from "../../services/chats/createChat";
import { CreateChatResponse } from "../../types/chatResponse";
import { getChatByUserIds } from "../../services/chats/getChatByUserIds";
import { MESSAGES } from "../../constants/messages";

export async function createChatController(req: Request<{}, {}, ChatSchema>, res: Response<CreateChatResponse>, next: NextFunction) {
    const { userIds } = req.body

    try {
        const validationResult = chatSchema.safeParse(req.body)
        
        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingChat = await getChatByUserIds(userIds)

        if (existingChat) {
            return next(new BadRequestError(MESSAGES.chat.alreadyExist))
        }

        const createdChat = await createChat(userIds)

        res.status(201).json({
            chat: createdChat
        })
    } catch (error) {
        next(new DatabaseError(writeError(error)))
    }
}