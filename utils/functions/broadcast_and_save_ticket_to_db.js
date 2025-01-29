import { apiEndpoint } from "../../constants.js";

export const broadcastAndSaveTicketToDB = async (
  deviceIdentifier,
  ticketType,
  ticketDetails
) => {
  try {
    const response = await fetch(`${apiEndpoint}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceIdentifier: deviceIdentifier,
        ticketType: ticketType,
        ticketDetails: ticketDetails,
      }),
    });
    if (!response.ok) {
      console.log("Failed to save ticket to DB");
      throw new Error("Failed to save ticket to DB");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
