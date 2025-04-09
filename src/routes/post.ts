import express from "express"
import { createPostController } from "../controllers/post/createPostController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { uploadFile } from "../utils/uploadFile"
import { updatePostController } from "../controllers/post/updatePostController"
import { deletePostController } from "../controllers/post/deletePostController"
import { likePostController } from "../controllers/post/likePostController"
import { getPostController } from "../controllers/post/getPostController"
import { getUserPostsController } from "../controllers/post/getUserPostsController"
import { getLikedPostsController } from "../controllers/post/getLikedPostsController"

const router = express.Router()

router.post("/create-post", authMiddleware, uploadFile.single("image"), createPostController)
router.patch("/update-post/:postId", authMiddleware, uploadFile.single("image"), updatePostController)
router.delete("/delete-post/:postId", authMiddleware, deletePostController)
router.patch("/like-post/:postId", authMiddleware, likePostController)
router.get("/get-post/:postId", getPostController)
router.get("/get-user-posts/:userId", getUserPostsController)
router.get("/get-liked-posts", authMiddleware, getLikedPostsController)

export default router