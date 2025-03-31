import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class AuthenticationError extends CustomError {   
    constructor(message: string = MESSAGES.auth.notAuthenticated) {
        super(message);
    }
    
    statusCode: number = 401;
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}