import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { FollowUserParams } from "../../types/params";
import { getUserById } from "../../services/users/getUserById";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { followUser } from "../../services/users/followUser";
import { USER_ID } from "../../constants";
import { ForbiddenError } from "../../errors/ForbiddenError";

export async function followUserController(req: Request<FollowUserParams>, res: Response, next: NextFunction) {
    const { userId } = req.params

    try {
        const existingUser = await getUserById(userId)

        if (!existingUser) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        if (existingUser.id === res.locals[USER_ID]) {
            return next(new ForbiddenError(MESSAGES.user.followYourself))
        }

        const followedUser = await followUser(res.locals[USER_ID], userId)

        res.status(200).json({
            followedUser
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}