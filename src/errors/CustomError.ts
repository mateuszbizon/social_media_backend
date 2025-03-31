export abstract class CustomError extends Error {
    constructor(message: string) {
        super(message)
    }

    abstract statusCode: number
    abstract writeMessage(): { message: string }
}