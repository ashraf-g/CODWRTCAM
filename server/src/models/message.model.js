const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    message_type: {
      type: String,
      enum: ["text", "file", "notification"],
      default: "text",
    },
    sent_at: {
      type: Date,
      default: Date.now,
    },
    view_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
