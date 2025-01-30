import { sendSupportAlert } from "../../utils/functions/send_support_alert.js";

export const handler = async (reciever) => {
  const result = await sendSupportAlert(reciever);

  if (result == true) {
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: reciever,
      type: "text",
      text: {
        body: "Support would be contacting you soon",
      },
    };
  } else {
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: reciever,
      type: "text",
      text: {
        body: "Something went wrong, please try again later",
      },
    };
  }
};
