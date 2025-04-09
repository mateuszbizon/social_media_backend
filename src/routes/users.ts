import express from "express"
import { signUpController } from "../controllers/users/signUpController"
import { signInController } from "../controllers/users/signInController"
import { getUserProfileController } from "../controllers/users/getUserProfileController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"
import { updateUserProfileController } from "../controllers/users/updateUserProfileController"
import { updateUserPasswordController } from "../controllers/users/updateUserPasswordController"
import { followUserController } from "../controllers/users/followUserController"

const router = express.Router()

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)
router.get("/get-user-profile/:username", getUserProfileController)
router.patch("/update-user-profile", authMiddleware, uploadFile.single("avatar"), updateUserProfileController)
router.patch("/update-user-password", authMiddleware, updateUserPasswordController)
router.patch("/follow-user/:userId", authMiddleware, followUserController)
router.get("/search-users")

export default router