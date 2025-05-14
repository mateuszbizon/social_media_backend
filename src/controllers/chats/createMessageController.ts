import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { CreateMessageParams } from "../../types/params";
import { USER_ID } from "../../constants";
import { messageSchema, MessageSchema } from "../../dtos/messageSchema";
import { createMessage } from "../../services/chats/createMessage";
import { CreateMessageResponse } from "../../types/chatResponse";
import { BadRequestError } from "../../errors/BadRequestError";

export async function createMessageController(req: Request<CreateMessageParams, {}, MessageSchema>, res: Response<CreateMessageResponse>, next: NextFunction) {
    const { chatId } = req.params
    const { content } = req.body
    const userId = res.locals[USER_ID] as string

    try {
        const validationResult = messageSchema.safeParse(req.body)
                
        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const createdMessage = await createMessage({
            chatId,
            content,
            senderId: userId
        })

        res.status(201).json({
            chatMessage: createdMessage
        })
    } catch (error) {
        next(new DatabaseError(writeError(error)))
    }
}