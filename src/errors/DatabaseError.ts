import { MESSAGES } from "../constants/messages";
import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {   
    constructor(message: string = MESSAGES.server.fail) {
        super(message);
    }
    
    statusCode: number = 500;
    writeMessage(): { message: string } {
        return { message: this.message }
    }
}