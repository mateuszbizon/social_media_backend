import { z } from "zod";
import { POST_CONTENT_EMPTY } from "../constants/validations";

export const postSchema = z.object({
    content: z.string().min(1, POST_CONTENT_EMPTY),
})

export type PostSchema = z.infer<typeof postSchema>