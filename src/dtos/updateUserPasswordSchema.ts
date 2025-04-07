import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE, PASSWORDS_NOT_EQUAL } from "../constants/validations";

export const updateUserPasswordSchema = z.object({
    oldPassword: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE),
    password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: PASSWORDS_NOT_EQUAL,
    path: ["confirmPassword"],
});

export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>