import asyncHandler from "express-async-handler";
import process from "process";
import {
  decryptRequest,
  encryptResponse,
  FlowEndpointException,
} from "../utils/encryption.js";
import { getNextScreen } from "../flows/booking_flow.js";

export const bookingFlow = asyncHandler(async (req, res) => {
  const { BASE64_PRIVATE_KEY, PASSPHRASE } = process.env;
  // eslint-disable-next-line no-undef
  const PRIVATE_KEY = Buffer.from(BASE64_PRIVATE_KEY, "base64").toString("ascii");
  if (!PRIVATE_KEY) {
    throw new Error(
      'Private key is empty. Please check your env variable "PRIVATE_KEY".'
    );
  }
  let decryptedRequest = null;
  try {
    decryptedRequest = decryptRequest(req.body, PRIVATE_KEY, PASSPHRASE);
  } catch (err) {
    console.error(err);
    if (err instanceof FlowEndpointException) {
      return res.status(err.statusCode).send();
    }
    return res.status(500).send();
  }

  const { aesKeyBuffer, initialVectorBuffer, decryptedBody } = decryptedRequest;
  console.log("💬 Decrypted Request:", decryptedBody);

  const screenResponse = await getNextScreen(decryptedBody);
  console.log("👉 Response to Encrypt:", screenResponse);

  res.send(encryptResponse(screenResponse, aesKeyBuffer, initialVectorBuffer));
});
