import express from "express";
import { whatsappMessageParserMiddleware } from "../middleware/whatsapp_message_parser_middleware.js";
import { saveMessageToDBMiddleWare } from "../middleware/save_message_to_db_middleware.js";
import { incomingWebhookMessage, webhookRegisteration } from "../controllers/webhook_controller.js";

export const webhookRouter = express.Router()

webhookRouter.post("/",saveMessageToDBMiddleWare,whatsappMessageParserMiddleware, incomingWebhookMessage);
webhookRouter.get("/", webhookRegisteration);