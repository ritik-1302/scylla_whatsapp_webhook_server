import AWS from "aws-sdk";

import { webSocketEndpoint } from "../baseURL.js";
import { webClient } from "../../models/web_client_model.js";

const client = new AWS.ApiGatewayManagementApi({ endpoint: webSocketEndpoint });

export const sendToClient = async (connectionId, message) => {
  try {
    await client
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(message),
      })
      .promise();
  } catch (err) {
    console.log(`Error sending message to ${connectionId}:`, err);
    if (err.statusCode === 410) {
      console.log(`Connection ${connectionId} is no longer valid`);
      try {
        await webClient.deleteOne({ connectionId: connectionId });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
