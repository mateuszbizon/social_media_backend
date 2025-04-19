import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { signInSchema, SignInSchema } from "../../dtos/signInSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { getUserByUsername } from "../../services/users/getUserByUsername";
import { MESSAGES } from "../../constants/messages";
import bcrypt from "bcryptjs"
import generateToken from "../../utils/generateToken";
import { SignInResponse } from "../../types/userResponse";
import { writeError } from "../../utils/writeError";

export async function signInController(req: Request<{}, {}, SignInSchema>, res: Response<SignInResponse>, next: NextFunction) {
    const { username, password } = req.body

    try {
        const validationResult = signInSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const existingUser = await getUserByUsername(username)

        if (!existingUser) {
            return next(new BadRequestError(MESSAGES.user.invalidCredentials))
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatch) {
            return next(new BadRequestError(MESSAGES.user.invalidCredentials))
        }

        const token = generateToken({
            id: existingUser.id,
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            avatar: existingUser.avatar
        })

        res.status(200).json({
            token,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                avatar: existingUser.avatar
            }
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}