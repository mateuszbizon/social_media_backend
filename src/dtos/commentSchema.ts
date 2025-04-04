import { z } from "zod";
import { COMMENT_EMPTY } from "../constants/validations";

export const commentSchema = z.object({
    content: z.string().min(1, COMMENT_EMPTY)
})

export type CommentSchema = z.infer<typeof commentSchema>