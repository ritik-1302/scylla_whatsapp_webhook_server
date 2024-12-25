import fs from "fs";
import path from "path";

import axios from "axios";
import process from "process";
import { baseURL } from "../constants.js";
import { sendMessage } from "../utils/functions/send_message.js";
const __dirname = path.resolve();

const handleCase = async (caseName, reciever) => {
  const caseFile = path.join(__dirname, "chats", `${caseName}.js`);

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

  if (listReplyId) {
    const data = await handleCase(listReplyId, "919805278485");
    await sendMessage(business_phone_number_id, data);
  }

  //For the start of the loop
  else if (message?.type === "text" && message.text.body === "START") {
    await axios({
      method: "POST",
      url: `${baseURL}/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "919805278485",
        type: "interactive",
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: "🛎 Scylla Service Bot",
          },
          body: {
            text: "Please select from the options below for your  service needs.",
          },
          footer: {
            text: "Powered By Reslink Technologies Pvt Ltd.",
          },
          action: {
            button: "View Options",
            sections: [
              {
                title: "Food & Beverages",
                rows: [
                  {
                    id: "food_order",
                    title: "Order Food",
                    description:
                      "Choose from our menu and order delicious meals.",
                  },
                  {
                    id: "beverages_order",
                    title: "Order Beverages",
                    description: "Select from a variety of refreshing drinks.",
                  },
                ],
              },

              {
                title: "Housekeeping",
                rows: [
                  {
                    id: "cleaning_service",
                    title: "Request Cleaning",
                    description: "Schedule a room cleaning.",
                  },
                  {
                    id: "towel_request",
                    title: "Request Towels",
                    description: "Request additional towels.",
                  },
                ],
              },
              {
                title: "Transportation",
                rows: [
                  {
                    id: "cab_service",
                    title: "Request a Ride",
                    description: "Schedule a Cab at your destination",
                  },
                ],
              },
            ],
          },
        },
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios({
      method: "POST",
      url: `${baseURL}/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  next();
};
