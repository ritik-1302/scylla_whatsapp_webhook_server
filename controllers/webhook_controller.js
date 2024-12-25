import expressAsyncHandler from "express-async-handler";
import process from "process";


export const webhookRegisteration=expressAsyncHandler(async(req,res)=>{
    const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
  
    // check the mode and token sent are correct
    if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
      // respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);
      console.log("Webhook verified successfully!");
    } else {
      // respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
)

export const incomingWebhookMessage=expressAsyncHandler(async(req, res)=>{
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  }
)