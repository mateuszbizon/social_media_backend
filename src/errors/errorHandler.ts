import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.writeMessage())
        return
    }

    res.status(500).json({ message: "An unknown error occurred" })
}

export default errorHandler