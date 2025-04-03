import express from "express"
import { createPostController } from "../controllers/post/createPostController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"
import { updatePostController } from "../controllers/post/updatePostController"
import { deletePostController } from "../controllers/post/deletePostController"

const router = express.Router()

router.post("/create-post", authMiddleware, uploadFile.single("image"), createPostController)
router.patch("/update-post/:postId", authMiddleware, uploadFile.single("image"), updatePostController)
router.delete("/delete-post/:postId", authMiddleware, deletePostController)

export default router