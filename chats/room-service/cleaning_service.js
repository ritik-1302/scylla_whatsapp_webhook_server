import { device } from "../../models/device_model.js";
import { ticket } from "../../models/ticket_model.js";

import { broadcastToAllClients } from "../../utils/functions/broadcast_to_all_client.js";

const broadcastHousekeepingMessageAndSaveToDatabase = async (
  deviceIdentifier
) => {
  try {
    console.log("DeviceIdentifier", deviceIdentifier);
    const whatsappDevice = await device.findOne({
      identifier: deviceIdentifier,
    });

    if (!whatsappDevice) {
      console.log("Device Not found");
      return false;
    } else {
      console.log("Device found");
      console.log("Device", whatsappDevice);
    }

    const deviceId = whatsappDevice._id;
    console.log("DeviceId", deviceId);

    const newTicket = await ticket.create({
      type: "Housekeeping",
      device: deviceId,
      status: "Open",
    });

    const populatedTicket = await ticket
      .findById(newTicket._id)
      .populate("device");

    await broadcastToAllClients({
      tickets: [populatedTicket],
    });
    return true;
  } catch (err) {
    console.log("Error is", err);
    return false;
  }
};

export const handler = async (reciever) => {
  const result = await broadcastHousekeepingMessageAndSaveToDatabase(reciever);

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
