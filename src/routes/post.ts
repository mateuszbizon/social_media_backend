import express from "express"
import { createPostController } from "../controllers/post/createPostController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/create-post", authMiddleware, createPostController)

export default router