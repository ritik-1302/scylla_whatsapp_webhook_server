import { broadcastAndSaveTicketToDB } from "../../utils/functions/broadcast_and_save_ticket_to_db.js";

export const handler = async (reciever) => {
  const result = await broadcastAndSaveTicketToDB(reciever, "Housekeeping", {});

  if (result == false) {
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: reciever,
      type: "text",
      text: {
        body: "Your Device is not registerd",
      },
    };
  } else {
    return {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: reciever,
      type: "text",
      text: {
        body: "Your Room will be cleaned Shortly",
      },
    };
  }
};
