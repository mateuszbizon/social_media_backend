import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { createServer } from "http"
import { Server } from "socket.io"
import errorHandler from "./errors/errorHandler"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import postRoutes from "./routes/post"
import commentRoutes from "./routes/comment"
import replyRoutes from "./routes/reply"
import chatRoutes from "./routes/chats"
import { chatSocket } from "./sockets/chatSockets"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    }
})

app.use(bodyParser.json())
app.use(cors())

app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/post", postRoutes)
app.use("/comment", commentRoutes)
app.use("/reply", replyRoutes)
app.use("/chats", chatRoutes)

app.use(errorHandler)

io.on("connection", (socket) => {
    chatSocket(socket)
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app