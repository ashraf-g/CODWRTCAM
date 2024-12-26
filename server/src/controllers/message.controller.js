const Message = require("../models/message.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

exports.sendMessage = async (req, res) => {
  try {
    const { project_id, sender_id, content, message_type } = req.body;
    if (!project_id || !sender_id || !content || !message_type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMessage = new Message({
      project_id,
      sender_id,
      content,
      message_type,
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error("Error in sending message:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getMessagesByProject = async (req, res) => {
  try {
    const messages = await Message.find({ project_id: req.params.project_id });
    res.json(messages);
  } catch (error) {
    console.error("Error in fetching messages by project_id:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.message_id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error("Error in fetching message by id:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.message_id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleting message:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};
