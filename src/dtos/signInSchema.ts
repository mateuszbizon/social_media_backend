import { z } from "zod";
import { PASSWORD_EMPTY, USERNAME_EMPTY } from "../constants/validations";

export const signInSchema = z.object({
    username: z.string().min(1, USERNAME_EMPTY),
    password: z.string().min(1, PASSWORD_EMPTY),
})

export type SignInSchema = z.infer<typeof signInSchema>