import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createCommentController } from "../controllers/comment/createCommentController"

const router = express.Router()

router.post("/create-comment/:postId", authMiddleware, createCommentController)
router.delete("/delete-comment/:commentId")

export default router