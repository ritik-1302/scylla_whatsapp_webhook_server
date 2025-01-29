import fs from "fs";
import path from "path";
import { sendMessage } from "../utils/functions/send_message.js";
import { handler } from "../chats/room-service/room_service.js";
const __dirname = path.resolve();

const handleCase = async (caseName, reciever) => {
  const caseFile = path.join(__dirname, "chats/room-service", `${caseName}.js`);
  console.log(caseFile);

  if (fs.existsSync(caseFile)) {
    const { handler } = await import(caseFile);
    return handler(reciever);
  } else {
    console.log(`Case file not found: ${caseFile}`);
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: reciever,
      type: "text",
      text: {
        body: `NO case file found for your ${caseFile}`,
      },
    };
  }
};

export const whatsappMessageParserMiddleware = async (req, res, next) => {
  console.log("Message Parser Middleware");
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  const business_phone_number_id =
    req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
  const listReplyId =
    req.body.entry?.[0]?.changes[0]?.value?.messages?.[0].interactive
      ?.list_reply?.id;

  const reciever = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0].from;

  if (listReplyId) {
    const data = await handleCase(listReplyId, reciever);
    await sendMessage(business_phone_number_id, data);
  }

  //For the start of the loop
  else if (message?.type === "text" && message.text.body === "START") {
    const data = handler(reciever);
    await sendMessage(business_phone_number_id, data);

    // Mark messages as read

    // await axios({
    //   method: "POST",
    //   url: `${baseURL}/${business_phone_number_id}/messages`,
    //   headers: {
    //     Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
    //   },
    //   data: {
    //     messaging_product: "whatsapp",
    //     status: "read",
    //     message_id: message.id,
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  next();
};
