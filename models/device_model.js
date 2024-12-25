import mongoose from "mongoose";
const deviceSchema = mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Alexa", "Whatsapp"],
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "guest",
  },
});

export const device = mongoose.model("device", deviceSchema);
