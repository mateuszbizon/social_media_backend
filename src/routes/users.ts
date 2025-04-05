import express from "express"
import { signUpController } from "../controllers/users/signUpController"
import { signInController } from "../controllers/users/signInController"
import { getUserProfileController } from "../controllers/users/getUserProfileController"

const router = express.Router()

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)
router.get("/get-user-profile/:username", getUserProfileController)

export default router