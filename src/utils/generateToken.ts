import jwt from "jsonwebtoken"
import { TokenPayload } from "../types"
import { TOKEN } from "../constants"

export default function generateToken({ id, username, firstName, lastName }: TokenPayload) {
    return jwt.sign({
        id, username, firstName, lastName
    }, TOKEN, { expiresIn: "7d" })
}