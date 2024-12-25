import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Housekeeping", "Food", "Other"],
    },

    device: {
      type: mongoose.Schema.ObjectId,
      ref: "device",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export const ticket = mongoose.model("ticket", ticketSchema);
