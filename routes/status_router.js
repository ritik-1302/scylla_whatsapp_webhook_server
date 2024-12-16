import express from "express";
import { testServer, testWhatsapp } from "../controllers/status_controller.js";

export const statusRouter = express.Router();

statusRouter.get("/server",testServer);

statusRouter.get("/whatsapp", testWhatsapp);
