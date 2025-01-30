import { sendMessage } from "../utils/functions/send_message.js";
import { messageObjectBuilder } from "../utils/messageObjectBuilder.js";
import asyncHandler from "express-async-handler";

export const sendMessageToPhone = asyncHandler(async (req, res) => {
  try {
    const data = messageObjectBuilder(req.body.query);
    await sendMessage(data);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message!\n" + error);
  }
});
