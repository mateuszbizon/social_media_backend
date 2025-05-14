import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { USER_ID } from "../../constants";
import { getChats } from "../../services/chats/getChats";
import { GetChatsResponse } from "../../types/chatResponse";

export async function getChatsController(req: Request, res: Response<GetChatsResponse>, next: NextFunction) {
    const page = Number(req.query.page) || 1
    const userId = res.locals[USER_ID] as string

    try {
        const chats = await getChats({
            userId,
            page
        })

        res.status(200).json({
            chats: chats.chats,
            currentPage: chats.currentPage,
            nextPage: chats.nextPage
        })
    } catch (error) {
        next(new DatabaseError(writeError(error)))
    }
}