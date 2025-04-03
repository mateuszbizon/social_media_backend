import express from "express"
import { createPostController } from "../controllers/post/createPostController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"
import { updatePostController } from "../controllers/post/updatePostController"

const router = express.Router()

router.post("/create-post", authMiddleware, uploadFile.single("image"), createPostController)
router.patch("/update-post/:postId", authMiddleware, uploadFile.single("image"), updatePostController)

export default router