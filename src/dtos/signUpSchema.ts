import { z } from "zod";
import {
	FIRST_NAME_EMPTY,
	LAST_NAME_EMPTY,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MIN_LENGTH_MESSAGE,
	PASSWORDS_NOT_EQUAL,
	USERNAME_MAX_LENGTH,
	USERNAME_MAX_LENGTH_MESSAGE,
	USERNAME_MIN_LENGTH,
	USERNAME_MIN_LENGTH_MESSAGE,
	USERNAME_NO_WHITE_SPACES,
} from "../constants/validations";

export const signUpSchema = z
	.object({
		firstName: z.string().min(1, FIRST_NAME_EMPTY),
		lastName: z.string().min(1, LAST_NAME_EMPTY),
		username: z
			.string()
			.min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_MESSAGE)
			.max(USERNAME_MAX_LENGTH, USERNAME_MAX_LENGTH_MESSAGE)
			.refine(password => {
				const noWhitespaceRegex = /\s/;

				return !noWhitespaceRegex.test(password);
			}, USERNAME_NO_WHITE_SPACES),
		password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_MESSAGE),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: PASSWORDS_NOT_EQUAL,
		path: ["confirmPassword"],
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;