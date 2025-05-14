import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createChatController } from "../controllers/chats/createChatController"

const router = express.Router()

router.post("/create-chat", authMiddleware, createChatController)

export default router