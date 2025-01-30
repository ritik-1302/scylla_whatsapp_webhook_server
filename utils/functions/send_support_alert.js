import { socketApiEndpoint } from "../../constants";

export const sendSupportAlert = async (reciever) => {
  try {
    const response = await fetch(`${socketApiEndpoint}/customer`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceIdentifier: reciever,
        isRequestingSupport: true,
      }),
    });
    if (!response.ok) {
      console.log("Failed to send support alert");
      throw new Error("Failed to send support alert");
    }
    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};
