const Notification = require("../models/notification.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

// Event listener for new notification

exports.newNotificationListener = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", (room) => {
      socket.join(room);
    });

    socket.on("new-notification", async (notification) => {
      try {
        const newNotification = new Notification(notification);
        await newNotification.save();

        // Send notification to all users in the room
        io.to(notification.room).emit("new-notification", newNotification);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

// Fetch notifications for a specific user

exports.fetchNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.user_id,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username email");

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Mark notifications as read

exports.markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user_id: req.params.user_id, read: false },
      { read: true }
    );

    res.json({ message: "Marked notifications as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Delete notifications

exports.deleteNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user_id: req.params.user_id });

    res.json({ message: "Deleted all notifications" });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Delete a specific notification

exports.deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.notification_id
    );

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Fetch notifications for a specific user in a specific room

exports.fetchRoomNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user_id: req.params.user_id,
      room: req.params.room,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username email");

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching room notifications:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Mark notifications in a specific room as read

exports.markRoomNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user_id: req.params.user_id,
        room: req.params.room,
        read: false,
      },
      { read: true }
    );

    res.json({ message: "Marked room notifications as read" });
  } catch (error) {
    console.error("Error marking room notifications as read:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Delete notifications in a specific room
