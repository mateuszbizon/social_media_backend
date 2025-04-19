import jwt from "jsonwebtoken"
import { TokenPayload } from "../types"
import { TOKEN } from "../constants"

export default function generateToken({ id, username, firstName, lastName, avatar }: TokenPayload) {
    return jwt.sign({
        id, username, firstName, lastName, avatar
    }, TOKEN, { expiresIn: "7d" })
}