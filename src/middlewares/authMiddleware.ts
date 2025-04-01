import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { AuthenticationError } from "../errors/AuthenticationError";
import { MESSAGES } from "../constants/messages";
import { TOKEN, USER_ID } from "../constants";
import { TokenPayload } from "../types";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return next(new AuthenticationError(MESSAGES.auth.tokenNotProvided))
        }

        const decodedToken = jwt.verify(token, TOKEN) as TokenPayload

        res.locals[USER_ID] = decodedToken.id

        next()

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