import express from "express"
import { createPostController } from "../controllers/post/createPostController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"

const router = express.Router()

router.post("/create-post", authMiddleware, uploadFile.single("image"), createPostController)
router.patch("/update-post")

export default router