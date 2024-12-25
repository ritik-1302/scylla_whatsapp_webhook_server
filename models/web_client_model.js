import mongoose from "mongoose";

const webClientSchema = mongoose.Schema({
  connectionId: {
    type: String,
    unique: true,
    required: true,
  },
});

export const webClient = mongoose.model("webClient", webClientSchema);