import { z } from "zod";
import { ALLOWED_FILE_TYPES, FILE_TYPE_NOT_ALLOWED, FIRST_NAME_EMPTY, LAST_NAME_EMPTY, USERNAME_MAX_LENGTH, USERNAME_MAX_LENGTH_MESSAGE, USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_MESSAGE, USERNAME_NO_WHITE_SPACES } from "../constants/validations";

export const updateUserSchema = z.object({
    firstName: z.string().min(1, FIRST_NAME_EMPTY),
    lastName: z.string().min(1, LAST_NAME_EMPTY),
    username: z
        .string()
        .min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_MESSAGE)
        .max(USERNAME_MAX_LENGTH, USERNAME_MAX_LENGTH_MESSAGE)
        .refine(username => {
            const noWhitespaceRegex = /\s/;

            return !noWhitespaceRegex.test(username);
        }, USERNAME_NO_WHITE_SPACES),
    avatar: z.any().refine((file: Express.Multer.File) => {
        return ALLOWED_FILE_TYPES.includes(file.mimetype)
    }, FILE_TYPE_NOT_ALLOWED).optional()
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>