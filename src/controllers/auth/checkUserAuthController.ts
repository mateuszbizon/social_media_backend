import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../errors/AuthenticationError";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { MESSAGES } from "../../constants/messages";
import { TokenPayload } from "../../types";
import { CheckUserAuth } from "../../types/authResponse";
import { TOKEN } from "../../constants";

export function checkUserAuthController(req: Request, res: Response<CheckUserAuth>, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return next(new AuthenticationError(MESSAGES.auth.tokenNotProvided))
        }

        const decodedToken = jwt.verify(token, TOKEN) as TokenPayload

        res.status(200).json({
            user: decodedToken
        })
    } catch (error) {
        console.error(error)

        if (error instanceof TokenExpiredError) {
            return next(new AuthenticationError(MESSAGES.auth.tokenExpired))
        }

        if (error instanceof JsonWebTokenError) {
            return next(new AuthenticationError(MESSAGES.auth.tokenInvalid))
        }

        next(new AuthenticationError())
    }
}