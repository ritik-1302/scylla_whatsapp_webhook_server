import express from "express"
import { bookingFlow } from "../controllers/flow_controller.js"
export const flowRouter=express.Router()

flowRouter.post("/booking",bookingFlow)