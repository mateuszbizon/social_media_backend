import express from "express"
import { checkUserAuthController } from "../controllers/auth/checkUserAuthController"

const router = express.Router()

router.get("/check-user-auth", checkUserAuthController)

export default router