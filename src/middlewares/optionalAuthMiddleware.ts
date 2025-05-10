import { Request, Response, NextFunction } from "express";
import { TOKEN, USER_ID } from "../constants";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            res.locals[USER_ID] = null
            return next()
        }

        const decodedToken = jwt.verify(token, TOKEN) as TokenPayload

        res.locals[USER_ID] = decodedToken.id

        next()
    } catch (error) {
        console.error(error)
        
        res.locals[USER_ID] = null

        next()
    }
}