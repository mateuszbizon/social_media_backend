import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createCommentController } from "../controllers/comment/createCommentController"
import { deleteCommentController } from "../controllers/comment/deleteCommentController"

const router = express.Router()

router.post("/create-comment/:postId", authMiddleware, createCommentController)
router.delete("/delete-comment/:commentId", authMiddleware, deleteCommentController)
router.patch("/like-comment/:commentId")

export default router