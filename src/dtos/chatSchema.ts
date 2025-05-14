import { z } from "zod";
import { CHAT_ARRAY_LENGTH, CHAT_ARRAY_MESSAGE, USER_ID_EMPTY } from "../constants/validations";

export const chatSchema = z.object({
    userIds: z.array(z.string().min(1, USER_ID_EMPTY)).min(CHAT_ARRAY_LENGTH, CHAT_ARRAY_MESSAGE)
})

export type ChatSchema = z.infer<typeof chatSchema>