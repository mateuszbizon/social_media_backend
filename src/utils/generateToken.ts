import jwt from "jsonwebtoken"
import { TokenPayload } from "../types"

export default function generateToken({ id, username, firstName, lastName }: TokenPayload) {
    return jwt.sign({
        id, username, firstName, lastName
    }, process.env.TOKEN_SECRET || "token", { expiresIn: "7d" })
}