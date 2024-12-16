import express from "express";
import { whatsappMessageParserMiddleware } from "../middleware/whatsapp_message_parser_middleware.js";
import { incomingWebhookMessage, webhookRegisteration } from "../controllers/webhook_controller.js";

export const webhookRouter = express.Router()

webhookRouter.post("/",whatsappMessageParserMiddleware, incomingWebhookMessage);

webhookRouter.get("/", webhookRegisteration);