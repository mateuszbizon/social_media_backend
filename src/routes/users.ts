import express from "express"
import { signUpController } from "../controllers/users/signUpController"
import { signInController } from "../controllers/users/signInController"
import { getUserProfileController } from "../controllers/users/getUserProfileController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"
import { updateUserProfileController } from "../controllers/users/updateUserProfileController"

const router = express.Router()

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)
router.get("/get-user-profile/:username", getUserProfileController)
router.patch("/update-user-profile", authMiddleware, uploadFile.single("avatar"), updateUserProfileController)
router.patch("/update-user-password")

export default router