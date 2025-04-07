import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createReplyController } from "../controllers/reply/createReplyController"

const router = express.Router()

router.post("/create-reply/:commentId", authMiddleware, createReplyController)
router.delete("/delete-reply/:replyId")

export default router