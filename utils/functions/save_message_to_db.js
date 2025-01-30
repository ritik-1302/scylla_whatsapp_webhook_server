import { socketApiEndpoint } from "../../constants.js";

export const saveMessageToDB = async (messageObject, deviceIdentifier) => {
    try {
      const response = await fetch(`${socketApiEndpoint}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageObject: messageObject,
          deviceIdentifier: deviceIdentifier,
        }),
      });
      if (!response.ok) {
        console.log("Failed to save message to DB");
        throw new Error("Failed to save message to DB");
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };