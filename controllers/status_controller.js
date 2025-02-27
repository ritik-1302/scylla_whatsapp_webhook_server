import asyncHandler from "express-async-handler";
import process from "process";
import axios from "axios";

export const testWhatsapp = asyncHandler(async (req, res) => {
  const baseURL = "https://graph.facebook.com/v21.0";
  const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;

  try {
    const response = await axios({
      method: "POST",
      url: `${baseURL}/573828302472402/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: "+919805278485",
        type: "template",
        template: {
          name: "hello_world",
          language: { code: "en_US" },
        },
      },
    });

    // Sending success response
    res
      .status(200)
      .send("Message sent successfully!\n" + JSON.stringify(response.data));
  } catch (error) {
    // Handling errors and sending a detailed response
    console.error("Error sending message: ", error);
    res.status(500).send("Error sending message!\n" + error);
  }
});

export const testServer = asyncHandler(async (req, res) => {
  res.send("Server is Running");
});


