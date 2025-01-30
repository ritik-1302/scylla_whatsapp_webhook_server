import { saveMessageToDB } from "../utils/functions/save_message_to_db.js";

export const saveMessageToDBMiddleWare = async (req, res, next) => {
  const messageObject = req.body;
  const deviceIdentifier =
    req.body.entry?.[0]?.changes[0]?.value?.messages?.[0].from;

  await saveMessageToDB(messageObject, deviceIdentifier);

  next();
};
