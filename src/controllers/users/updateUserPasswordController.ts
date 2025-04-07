import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { updateUserPasswordSchema, UpdateUserPasswordSchema } from "../../dtos/updateUserPasswordSchema";
import { BadRequestError } from "../../errors/BadRequestError";
import { getUserById } from "../../services/users/getUserById";
import { USER_ID } from "../../constants";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import bcrypt from "bcryptjs";
import { updateUserPassword } from "../../services/users/updateUserPassword";

export async function updateUserPasswordController(req: Request<{}, {}, UpdateUserPasswordSchema>, res: Response, next: NextFunction) {
    const { oldPassword, password } = req.body

    try {
        const validationResult = updateUserPasswordSchema.safeParse(req.body)

        if (!validationResult.success) {
            return next(new BadRequestError(validationResult.error.errors[0].message))
        }

        const currentUser = await getUserById(res.locals[USER_ID])

        if (!currentUser) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, currentUser.password)

        if (!isPasswordValid) {
            return next(new BadRequestError(MESSAGES.user.invalidOldPassword))
        }

        const hashedNewPassword = await bcrypt.hash(password, 12)

        await updateUserPassword({
            id: currentUser.id,
            password: hashedNewPassword
        })

        res.status(200).send("Password updated")
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}