import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createChatController } from "../controllers/chats/createChatController"
import { getChatsController } from "../controllers/chats/getChatsController"
import { createMessageController } from "../controllers/chats/createMessageController"
import { getSingleChatController } from "../controllers/chats/getSingleChatController"

const router = express.Router()

router.post("/create-chat", authMiddleware, createChatController)
router.get("/get-chats", authMiddleware, getChatsController)
router.post("/create-message/:chatId", authMiddleware, createMessageController)
router.get("/get-single-chat/:chatId", authMiddleware, getSingleChatController)
router.get("/get-chat-messages/:chatId")

export default router