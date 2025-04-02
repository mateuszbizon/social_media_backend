import { z } from "zod";
import { ALLOWED_FILE_TYPES, FILE_TYPE_NOT_ALLOWED, POST_CONTENT_EMPTY } from "../constants/validations";

export const postSchema = z.object({
    content: z.string().min(1, POST_CONTENT_EMPTY),
    image: z.any().refine((file: Express.Multer.File) => {
        return ALLOWED_FILE_TYPES.includes(file.mimetype)
    }, FILE_TYPE_NOT_ALLOWED)
})

export type PostSchema = z.infer<typeof postSchema>