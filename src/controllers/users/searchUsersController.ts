import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../../errors/DatabaseError";
import { writeError } from "../../utils/writeError";
import { SearchUsersSearchParams } from "../../types/searchParams";
import { searchUsers } from "../../services/users/searchUsers";
import { SearchUsersResponse } from "../../types/userResponse";

export async function searchUsersController(req: Request<{}, {}, {}, SearchUsersSearchParams>, res: Response<SearchUsersResponse>, next: NextFunction) {
    const page = Number(req.query.page) || 1
    const query = req.query.query

    try {
        const users = await searchUsers({
            page,
            query
        })

        res.status(200).json({
            users: users.users.map(user => {
                return {
                    ...user,
                    followersCount: user._count.followers
                }
            }),
            totalPages: users.totalPages,
            currentPage: users.currentPage,
            totalUsers: users.totalUsers,
            nextPage: users.nextPage
        })
    } catch (error) {
        console.error(error)
        next(new DatabaseError(writeError(error)))
    }
}