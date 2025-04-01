import express from "express"
import { signUpController } from "../controllers/users/signUpController"
import { signInController } from "../controllers/users/signInController"

const router = express.Router()

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)

export default router