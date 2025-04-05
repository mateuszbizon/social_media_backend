import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createCommentController } from "../controllers/comment/createCommentController"
import { deleteCommentController } from "../controllers/comment/deleteCommentController"
import { likeCommentController } from "../controllers/comment/likeCommentController"

const router = express.Router()

router.post("/create-comment/:postId", authMiddleware, createCommentController)
router.delete("/delete-comment/:commentId", authMiddleware, deleteCommentController)
router.patch("/like-comment/:commentId", authMiddleware, likeCommentController)

export default router