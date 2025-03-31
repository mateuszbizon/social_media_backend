import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message)
    }

    statusCode: number = 404
    writeMessage(): { message: string; } {
        return { message: this.message }
    }
}