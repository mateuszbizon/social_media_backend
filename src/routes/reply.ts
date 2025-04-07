import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createReplyController } from "../controllers/reply/createReplyController"
import { deleteReplyController } from "../controllers/reply/deleteReplyController"

const router = express.Router()

router.post("/create-reply/:commentId", authMiddleware, createReplyController)
router.delete("/delete-reply/:replyId", authMiddleware, deleteReplyController)

export default router