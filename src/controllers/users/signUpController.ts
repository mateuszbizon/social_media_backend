import { NextFunction, Request, Response } from "express";
import { signUpSchema, SignUpSchema } from "../../dtos/signUpSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { DatabaseError } from "../../errors/DatabaseError";
import { getUserByUsername } from "../../services/users/getUserByUsername";
import { MESSAGES } from "../../constants/messages";
import bcrypt from "bcryptjs"
import { createUser } from "../../services/users/createUser";
import { SignUpResponse } from "../../types/userResponse";
import { writeError } from "../../utils/writeError";

export async function signUpController(req: Request<{}, {}, SignUpSchema>, res: Response<SignUpResponse>, next: NextFunction) {
    const { firstName, lastName, username, password } = req.body

    try {
        const resultValidation = signUpSchema.safeParse(req.body)

        if (!resultValidation.success) {
            return next(new BadRequestError(resultValidation.error.errors[0].message))
        }

        const existingUser = await getUserByUsername(username)

        if (existingUser) {
            return next(new BadRequestError(MESSAGES.user.usernameTaken))
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const createdUser = await createUser({
            firstName,
            lastName,
            username,
            password: hashedPassword
        })

        res.status(201).json({
            user: createdUser
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}