const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  notification_type: {
    type: String,
    enum: ["info", "warning", "alert"],
    default: "info",
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
