import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {   
    constructor(message: string = MESSAGES.auth.forbidden) {
        super(message);
    }
    
    statusCode: number = 403;
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}