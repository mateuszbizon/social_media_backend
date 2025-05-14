import { z } from "zod";

export const messageSchema = z.object({
    content: z.string().min(1, "Message is required")
})

export type MessageSchema = z.infer<typeof messageSchema>