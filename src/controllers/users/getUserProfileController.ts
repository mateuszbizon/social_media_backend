import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { GetUserProfileParams } from "../../types/params";
import { getUserProfile } from "../../services/users/getUserProfile";
import { NotFoundError } from "../../errors/NotFoundError";
import { MESSAGES } from "../../constants/messages";
import { GetUserProfileResponse } from "../../types/userResponse";

export async function getUserProfileController(req: Request<GetUserProfileParams>, res: Response<GetUserProfileResponse>, next: NextFunction) {
    const { username } = req.params

    try {
        const user = await getUserProfile(username)

        if (!user) {
            return next(new NotFoundError(MESSAGES.user.notFound))
        }

        res.status(200).json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar
            },
            postsCount: user._count.posts,
            followersCount: user._count.followers,
            followingCount: user._count.following
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}