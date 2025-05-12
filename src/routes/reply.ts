import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createReplyController } from "../controllers/reply/createReplyController"
import { deleteReplyController } from "../controllers/reply/deleteReplyController"
import { likeReplyController } from "../controllers/reply/likeReplyController"
import { getCommentRepliesController } from "../controllers/reply/getCommentRepliesController"
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware"

const router = express.Router()

router.post("/create-reply/:commentId/:replyingToId", authMiddleware, createReplyController)
router.delete("/delete-reply/:replyId", authMiddleware, deleteReplyController)
router.patch("/like-reply/:replyId", authMiddleware, likeReplyController)
router.get("/get-comment-replies/:commentId", optionalAuthMiddleware, getCommentRepliesController)

export default router