import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {   
    constructor(error?: Error, message: string = MESSAGES.server.fail) {
        super(message);
        this.error = error
    }
    
    error?: Error
    statusCode: number = 500;
    writeMessage(): { message: string, error?: Error } {
        return { message: this.message, error: this.error }
    }
}