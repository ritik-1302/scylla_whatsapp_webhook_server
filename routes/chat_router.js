import express from "express"
import { sendMessageToPhone } from "../controllers/chat_controller.js"

export const chatRouter=express.Router()

chatRouter.post("/",sendMessageToPhone)