import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createChatController } from "../controllers/chats/createChatController"
import { getChatsController } from "../controllers/chats/getChatsController"

const router = express.Router()

router.post("/create-chat", authMiddleware, createChatController)
router.get("/get-chats", authMiddleware, getChatsController)
router.post("/create-message/:chatId")

export default router