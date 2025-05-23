import { Socket } from "socket.io"
import { Message } from "../types/chatResponse"

export function chatSocket(socket: Socket) {
    console.log("Socket connected: " + socket.id)
    
    socket.on("joinChat", ({ chatId, userId }: { chatId: string, userId: string }) => {
        socket.join(chatId)
        console.log(`User with id ${userId} joined chat ${chatId}`)
    })

    socket.on("sendMessage", ({ chatId, message }: { chatId: string, message: Message }) => {
        socket.to(chatId).emit("receiveMessage", message)
    })

    socket.on("typing", ({ chatId }: { chatId: string }) => {
        socket.to(chatId).emit("typing")
    })

    socket.on("stopTyping", ({ chatId }: { chatId: string }) => {
        socket.to(chatId).emit("stopTyping")
    })
}