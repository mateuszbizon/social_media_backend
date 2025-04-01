import express from "express"
import { signUpController } from "../controllers/users/signUpController"

const router = express.Router()

router.post("/sign-up", signUpController)

export default router